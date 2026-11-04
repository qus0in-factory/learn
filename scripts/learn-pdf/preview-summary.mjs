import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { root } from './paths.mjs';
import { deckPage } from './pilot/page.mjs';
import { launch } from './runtime.mjs';
const name = process.argv[2];
if (!/^\d{2}-[\w-]+$/.test(name || '')) throw Error('Expected STEP slug');
const directory = resolve(root, 'dist/slide-preview');
await mkdir(directory, { recursive: true });
const browser = await launch();
try {
  const { page } = await deckPage(browser, `step${name.slice(0, 2)}.json`);
  await writeFile(resolve(directory, `${name}.html`), await page.content());
} finally { await browser.close(); }
