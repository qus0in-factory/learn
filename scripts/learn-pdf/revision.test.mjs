import { test } from 'node:test';
import assert from 'node:assert/strict';
import { writeFileSync, rmSync } from 'node:fs';
import { fixture } from './revision-fixture.mjs';
test('changed source with unchanged revision fails closed', async () => {
  const { root, load } = await fixture();
  try {
    const { checkRevision } = await load('revision-check.mjs');
    checkRevision();
    writeFileSync(root + '/docs/lecture/01.md', 'changed');
    assert.throws(checkRevision, /source\/revision mismatch/);
  } finally { rmSync(root, { recursive: true }); }
});
