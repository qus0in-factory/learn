import { createHash } from 'node:crypto';
export function prove(bytes, size, sha256) {
  if (bytes.length !== size || createHash('sha256').update(bytes).digest('hex') !== sha256) {
    throw Error('Remote PDF size/SHA mismatch');
  }
}
export async function verifyFiles(files, read) {
  if (files.length !== 12) throw Error('Expected 12 sealed PDF objects');
  for (const { key, size, sha256 } of files) {
    prove(await read(key), size, sha256);
  }
}
