import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { deploy } from './deploy.mjs';
import { verifyFiles } from './verify-files.mjs';
test('missing, truncated and same-size corrupt R2 objects stop all deployment commands', async () => {
  const bytes = Buffer.from('data');
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const files = Array.from({ length: 12 }, (_, key) => ({ key, size: 4, sha256 }));
  for (const bad of [null, Buffer.from('x'), Buffer.from('evil')]) {
    let commands = 0;
    const read = key => {
      if (key !== 5) return bytes;
      if (!bad) throw Error('No such key');
      return bad;
    };
    await assert.rejects(deploy(() => verifyFiles(files, read), () => commands++));
    assert.equal(commands, 0);
  }
  await assert.rejects(verifyFiles(files.slice(1), () => bytes), /Expected 12/);
});
