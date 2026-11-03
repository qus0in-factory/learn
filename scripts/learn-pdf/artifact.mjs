import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { output } from './paths.mjs';
import { checkRevision } from './revision-check.mjs';
const file = output + '/artifact.json';
const digest = name => createHash('sha256').update(readFileSync(`${output}/${name}.pdf`)).digest('hex');
export function seal(results) {
  writeFileSync(file, JSON.stringify({ revision: checkRevision(),
    pdfs: Object.fromEntries(results.map(({ name }) => [name, digest(name)])) }, null, 2));
}
export function checkArtifact() {
  const saved = JSON.parse(readFileSync(file));
  if (saved.revision !== checkRevision() || Object.keys(saved.pdfs).length !== 12 ||
    Object.entries(saved.pdfs).some(([name, sha]) => digest(name) !== sha)) {
    throw Error('PDF artifact/revision mismatch; rebuild required');
  }
}
