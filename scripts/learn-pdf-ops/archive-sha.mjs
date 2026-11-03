import { createHash } from 'node:crypto';
export function archiveSha(bytes, expected) {
  const actual = createHash('sha256').update(bytes).digest('hex');
  if (actual !== expected) throw Error('Pinned browser archive checksum mismatch');
  return actual;
}
