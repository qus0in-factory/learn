import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { launch } from './runtime.mjs';
import { output } from './paths.mjs';
import { exportAll } from './export-all.mjs';
import { provenance } from './provenance.mjs';
import { renderer } from './bundle.mjs';
import { checkRevision } from './revision-check.mjs';
import { seal } from './artifact.mjs';
checkRevision(true);
await mkdir(output, { recursive: true });
const bundle = await renderer();
const browser = await launch();
provenance(browser);
try {
  const results = await exportAll(browser, bundle);
  await writeFile(resolve(output, 'manifest.json'), JSON.stringify(results, null, 2));
  seal(results);
} finally { await browser.close(); }
