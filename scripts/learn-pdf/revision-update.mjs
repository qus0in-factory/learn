import { readFileSync, writeFileSync } from 'node:fs';
import { configFile } from './revision-check.mjs';
import { sourceRevision } from './source-revision.mjs';
import { root } from './paths.mjs';
import { execFileSync } from 'node:child_process';
if (process.argv.slice(2).join(' ') !== '--update-revision') {
  throw Error('Explicit --update-revision required');
}
const config = JSON.parse(readFileSync(configFile));
const revision = sourceRevision();
const readme = root + '/README.md';
const text = readFileSync(readme, 'utf8');
const pattern = /([?&]revision=)[0-9a-f]{7,40}/g;
if ([...text.matchAll(pattern)].length !== 12) throw Error('Expected 12 README PDF URLs');
writeFileSync(configFile, JSON.stringify({ ...config, revision }, null, 2) + '\n');
writeFileSync(readme, text.replace(pattern, `$1${revision}`));
console.log('PDF revision updated:', revision);
execFileSync(process.execPath, ['--test', 'scripts/learn/readme.test.mjs',
  'scripts/learn/url.test.mjs'], { cwd: root, stdio: 'inherit' });
