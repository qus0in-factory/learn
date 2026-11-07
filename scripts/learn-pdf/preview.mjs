import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { root } from './paths.mjs';
import { lectureFiles } from '../learn/paths.mjs';
import { launch } from './runtime.mjs';
import { deckPage } from './pilot/page.mjs';
import { audit } from './pilot/audit.mjs';

// Preview the working decks without replacing the sealed release artifacts.
const output = resolve(root, 'dist/learn-pdfs-preview');
await mkdir(output, { recursive: true });
await rm(resolve(output, 'manifest.json'), { force: true });
const browser = await launch();
const results = [];
const failures = [];
try {
  for (const file of await lectureFiles()) {
    const name = file.replace('.md', '');
    let page;
    try {
      const prepared = await deckPage(browser, `step${name.slice(0, 2)}.json`);
      page = prepared.page;
      const deck = prepared.deck;
      const title = `${deck[0].step} ${deck[0].title}`;
      await page.evaluate(value => document.title = value, title);
      const fonts = await audit(page);
      const path = resolve(output, `${name}.pdf`);
      await page.pdf({ path, preferCSSPageSize: true, printBackground: true });
      const samples = [...new Set([1, 4, Math.ceil(deck.length / 2), deck.length,
        ...deck.flatMap((slide, i) => slide.image ? [i + 1] : [])])];
      const source = await readFile(new URL(`pilot/step${name.slice(0, 2)}.json`, import.meta.url));
      results.push({ name, title, pages: deck.length, samples, fonts,
        sourceSha256: createHash('sha256').update(source).digest('hex'),
        sha256: createHash('sha256').update(await readFile(path)).digest('hex') });
      console.log(`${name}: ${deck.length} pages; fonts, bounds and overlaps OK`);
    } catch (error) {
      failures.push({ name, error: error.message });
      console.error(`${name}: ${error.message}`);
    } finally {
      await page?.close();
    }
  }
  if (failures.length) throw Error(JSON.stringify(failures));
  await writeFile(resolve(output, 'manifest.json'), JSON.stringify(results, null, 2) + '\n');
  console.log(`Local previews: ${output}`);
} finally {
  await browser.close();
}
