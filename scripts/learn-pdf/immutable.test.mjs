import test from 'node:test';
import assert from 'node:assert/strict';
import { copyFileSync, writeFileSync, rmSync } from 'node:fs';
import { fixture } from './revision-fixture.mjs';
test('immutable upload skips identical bytes and refuses replacement', async () => {
  const { root, load } = await fixture();
  try {
    copyFileSync(new URL('immutable-put.mjs', import.meta.url), root + '/scripts/learn-pdf/immutable-put.mjs');
    const { immutablePut } = await load('immutable-put.mjs');
    const file = root + '/dist/learn-pdfs/a.pdf';
    writeFileSync(file, '%PDF-new');
    let bytes = '%PDF-new';
    const run = (_, args) => {
      assert(args.includes('get'));
      writeFileSync(args.at(-1), bytes);
    };
    immutablePut(file, 'bucket/key', run);
    bytes = '%PDF-old';
    assert.throws(() => immutablePut(file, 'bucket/key', run), /Immutable object differs/);
  } finally { rmSync(root, { recursive: true }); }
});
