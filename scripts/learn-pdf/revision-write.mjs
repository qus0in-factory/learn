import { readFileSync, writeFileSync } from 'node:fs';
import { configFile } from './revision-check.mjs';
import { root } from './paths.mjs';

export function writeRevision(revision) {
  const config = JSON.parse(readFileSync(configFile));
  const readme = root + '/README.md';
  const text = readFileSync(readme, 'utf8');
  const pattern = /([?&]revision=)[0-9a-f]{7,40}/g;
  if ([...text.matchAll(pattern)].length !== 12) throw Error('Expected 12 README PDF URLs');
  writeFileSync(configFile, JSON.stringify({ ...config, revision }, null, 2) + '\n');
  writeFileSync(readme, text.replace(pattern, `$1${revision}`));
}
