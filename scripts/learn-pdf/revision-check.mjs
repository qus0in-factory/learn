import { readFileSync } from 'node:fs';
import { sourceRevision } from './source-revision.mjs';
export const configFile = new URL('../../learn-site/.vitepress/pdf.json', import.meta.url);
export function checkRevision() {
  const { revision } = JSON.parse(readFileSync(configFile));
  if (revision !== sourceRevision()) {
    throw Error('PDF source/revision mismatch; run revision-update.mjs --update-revision then rebuild');
  }
  return revision;
}
