import test from 'node:test';
import assert from 'node:assert/strict';
import { archiveSha } from '../learn-pdf-ops/archive-sha.mjs';
test('pinned ZIP SHA accepts the known digest and rejects corruption', () => {
  const expected = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad';
  assert.equal(archiveSha(Buffer.from('abc'), expected), expected);
  assert.throws(() => archiveSha(Buffer.from('abd'), expected), /checksum mismatch/);
  assert.throws(() => archiveSha(Buffer.from('abc'), 'bad'), /checksum mismatch/);
});
