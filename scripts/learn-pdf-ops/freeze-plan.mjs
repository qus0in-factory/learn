import { createHash } from 'node:crypto';
import { sourceFiles } from './source-files.mjs';
import { verifyProvenance } from './source-provenance.mjs';
import { checkRevision } from '../learn-pdf/revision-check.mjs';
import { uploadFiles } from '../learn-pdf/upload-files.mjs';
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export async function freezePlan(sourceCommit) {
  const revision = checkRevision(true);
  await uploadFiles();
  const inputs = sourceFiles();
  const hash = createHash('sha1');
  for (const { path, bytes } of inputs) hash.update(path + '\0').update(bytes).update('\0');
  if (hash.digest('hex') !== revision) throw Error('Source enumeration mismatch');
  if (sourceCommit) verifyProvenance(sourceCommit, inputs);
  const files = inputs.map(({ path, bytes }) => ({ path, sha256: sha256(bytes) }));
  return { sourceCommit, revision, files };
}
