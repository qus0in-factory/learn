import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from 'esbuild';
import { launch } from './runtime.mjs';
import { here, root, output } from './paths.mjs';
import { exportLesson } from './export.mjs';
import { provenance } from './provenance.mjs';
await mkdir(output, { recursive: true });
const bundle = resolve(output, 'renderer.js');
await build({ entryPoints: [resolve(here, 'browser.js')], bundle: true, outfile: bundle });
const browser = await launch();
provenance(browser);
try {
  const dir = resolve(root, 'docs/lecture');
  const files = (await readdir(dir)).filter(n => /^\d\d-.*\.md$/.test(n)).sort();
  if (files.length !== 12) throw Error('Expected 12 lessons');
  const results = [];
  for (const file of files) results.push(await exportLesson(browser, resolve(dir, file), bundle));
  await writeFile(resolve(output, 'manifest.json'), JSON.stringify(results, null, 2));
} finally { await browser.close(); }
