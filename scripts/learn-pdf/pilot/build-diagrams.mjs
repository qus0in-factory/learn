import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { launch } from '../runtime.mjs';
import { prepare } from './prepare.mjs';
import { diagramTheme } from './diagram-theme.mjs';
const read = f => readFile(new URL(f, import.meta.url), 'utf8');
const browser = await launch();
try {
  const page = await prepare(browser, read);
  await page.addScriptTag({ path: process.argv[2] });
  await page.evaluate(config => mermaid.initialize(config), await diagramTheme(page));
  await mkdir(new URL('assets/', import.meta.url), { recursive: true });
  for (const [id, source] of Object.entries(JSON.parse(await read('diagrams.json')))) {
    const svg = await page.evaluate(async ({ id, source }) =>
      (await mermaid.render(id, source)).svg, { id, source });
    await writeFile(new URL(`assets/${id}.svg`, import.meta.url), svg);
  }
} finally { await browser.close(); }
