import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from 'esbuild';
import { chromium } from 'playwright';
import { here, root, output } from './paths.mjs';
import { exportLesson } from './export.mjs';
await mkdir(output, { recursive: true });
const bundle = resolve(output, 'renderer.js');
await build({ entryPoints: [resolve(here, 'browser.js')], bundle: true, outfile: bundle });
const browser = await chromium.launch({ channel: process.env.PDF_BROWSER || 'chrome' });
try {
  const dir = resolve(root, 'docs/lecture');
  const files = (await readdir(dir)).filter(n => /^\d\d-.*\.md$/.test(n)).sort();
  if (files.length !== 12) throw Error('Expected 12 lessons');
  const results = [];
  for (const file of files) results.push(await exportLesson(browser, resolve(dir, file), bundle));
  await writeFile(resolve(output, 'manifest.json'), JSON.stringify(results, null, 2));
} finally { await browser.close(); }
