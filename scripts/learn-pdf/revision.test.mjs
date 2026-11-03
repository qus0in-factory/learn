import { test } from 'node:test';
import assert from 'node:assert/strict';
import { writeFileSync, rmSync } from 'node:fs';
import { fixture } from './revision-fixture.mjs';
import { freeze } from './freeze-fixture.mjs';
test('mutable source and frozen snapshot each fail closed on seal mismatch', async () => {
  const { root, load } = await fixture();
  try {
    const { checkRevision } = await load('revision-check.mjs');
    checkRevision();
    writeFileSync(root + '/docs/lecture/01.md', 'changed');
    assert.throws(checkRevision, /source\/revision mismatch/);
    const manifest = freeze(root);
    const pinned = checkRevision();
    assert.throws(() => checkRevision(true), /PDF frozen/);
    writeFileSync(root + '/docs/lecture/01.md', 'site-only change');
    assert.equal(checkRevision(), pinned);
    writeFileSync(manifest, '{}');
    assert.throws(checkRevision, /snapshot mismatch/);
  } finally { rmSync(root, { recursive: true }); }
});
