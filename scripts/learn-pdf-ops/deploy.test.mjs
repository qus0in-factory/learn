import test from 'node:test';
import assert from 'node:assert/strict';
import { deploy } from './deploy.mjs';
test('R2 guard precedes site build, SQL generation, Worker and D1 updates', async () => {
  let verified = false;
  const calls = [];
  await deploy(async () => { verified = true; }, (cmd, args) => {
    assert(verified);
    calls.push([cmd, ...args].join(' '));
  });
  assert.equal(calls.length, 4);
  assert.match(calls[0], /vitepress build/);
  assert.match(calls[1], /sync-learn-d1/);
  assert.match(calls[2], /wrangler deploy/);
  assert.match(calls[3], /wrangler d1 execute/);
});
