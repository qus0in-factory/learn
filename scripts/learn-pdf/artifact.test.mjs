import { test } from 'node:test';
import assert from 'node:assert/strict';
import { writeFileSync, rmSync } from 'node:fs';
import { fixture } from './revision-fixture.mjs';
test('upload rejects PDF bytes changed after build seal', async () => {
  const { root, load } = await fixture();
  try {
    const { seal, checkArtifact } = await load('artifact.mjs');
    const results = Array.from({ length: 12 }, (_, i) => ({ name: String(i) }));
    const dir = root + '/dist/learn-pdfs/';
    for (const { name } of results) writeFileSync(dir + name + '.pdf', '%PDF-original');
    seal(results);
    checkArtifact();
    writeFileSync(dir + '0.pdf', '%PDF-changed');
    assert.throws(checkArtifact, /artifact\/revision mismatch/);
  } finally { rmSync(root, { recursive: true }); }
});
