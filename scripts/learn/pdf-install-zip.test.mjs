import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { installZip } from '../learn-pdf-ops/install-zip.mjs';
import { zipCommands } from '../learn-pdf-ops/zip-fixture.mjs';
test('installZip rejects tampered bytes before extraction or completion marker', () => {
  const root = mkdtempSync(tmpdir() + '/pdf-zip-');
  const asset = { directory: 'test', path: 'mock.zip',
    sha256: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad' };
  const commands = [];
  try {
    assert.throws(() => installZip(asset, root + '/bad', root,
      zipCommands('abd', commands)), /checksum mismatch/);
    assert.deepEqual(commands, ['curl']);
    assert(!existsSync(root + '/bad/INSTALLATION_COMPLETE'));
    installZip(asset, root + '/good', root, zipCommands('abc', []));
    assert(existsSync(root + '/good/INSTALLATION_COMPLETE'));
  } finally { rmSync(root, { recursive: true }); }
});
