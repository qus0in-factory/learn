import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { launch } from './runtime.mjs';
import { root, output } from './paths.mjs';
import { lectureFiles } from '../learn/paths.mjs';
import { exportLesson } from './export.mjs';
import { provenance } from './provenance.mjs';
import { renderer } from './bundle.mjs';
import { checkRevision } from './revision-check.mjs';
import { seal } from './artifact.mjs';
checkRevision();
await mkdir(output, { recursive: true });
const bundle = await renderer();
const browser = await launch();
provenance(browser);
try {
  const files = await lectureFiles();
  if (files.length !== 12) throw Error('Expected 12 lessons');
  const results = [];
  for (const file of files) results.push(await exportLesson(browser, resolve(root, 'docs/lecture', file), bundle));
  await writeFile(resolve(output, 'manifest.json'), JSON.stringify(results, null, 2));
  seal(results);
} finally { await browser.close(); }
