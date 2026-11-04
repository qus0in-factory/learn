import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, basename } from 'node:path';
import { root } from './paths.mjs';
import { summary } from './summary.mjs';
import { renderer } from './bundle.mjs';
import { createPage } from './page.mjs';
import { launch } from './runtime.mjs';
const name = process.argv[2];
if (!/^\d{2}-[\w-]+$/.test(name || '')) throw Error('Expected STEP slug');
const directory = resolve(root, 'dist/slide-preview');
await mkdir(directory, { recursive: true });
const html = summary(await readFile(resolve(root,
  'scripts/learn-pdf/content', `${name}.md`), 'utf8'), name);
const browser = await launch();
try {
  const page = await createPage(browser, await renderer(directory), basename(name));
  await page.evaluate(html => window.prepare(html), html);
  await writeFile(resolve(directory, `${name}.html`), await page.content());
} finally { await browser.close(); }
