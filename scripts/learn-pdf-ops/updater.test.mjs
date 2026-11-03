import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, rmSync } from 'node:fs';
import { updaterFixture } from './updater-fixture.mjs';
test('updater requires opt-in, updates twelve URLs and is idempotent', async () => {
  const { root, run, load } = await updaterFixture();
  const read = path => readFileSync(root + path, 'utf8');
  try {
    const before = read('/README.md');
    assert.notEqual(run().status, 0);
    assert.equal(read('/README.md'), before);
    const first = run('--update-revision');
    assert.equal(first.status, 0, first.stderr);
    const { sourceRevision } = await load('source-revision.mjs');
    const revision = sourceRevision();
    assert.equal(JSON.parse(read('/learn-site/.vitepress/pdf.json')).revision, revision);
    assert.equal(read('/README.md'), before.replaceAll('abcdef0', revision));
    assert.equal(run('--update-revision').status, 0);
  } finally { rmSync(root, { recursive: true }); }
});
