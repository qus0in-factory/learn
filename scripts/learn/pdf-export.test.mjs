import test from 'node:test';
import assert from 'node:assert/strict';
import { rmSync } from 'node:fs';
import { exportCase } from '../learn-pdf-ops/export-case.mjs';
import { calls } from '../learn-pdf-ops/export-fixture.mjs';
import { output } from '../learn-pdf/paths.mjs';
test('real export wiring audits fonts before PDF and uses CSS page size', async () => {
  const { dir, file, hooks } = exportCase();
  const browser = {};
  try {
    const { exportDeck } = await import('../learn-pdf/pilot/export.mjs');
    const result = await exportDeck(browser, '01-fixture');
    assert.deepEqual(calls.map(c => c.event), ['create', 'audit', 'pdf', 'close']);
    assert.equal(calls[0].browser, browser);
    assert.equal(calls[0].source[0].step, 'STEP 01');
    assert.equal(calls[2].path, output + '/01-fixture.pdf');
    assert.equal(calls[2].preferCSSPageSize, true);
    assert.deepEqual(result.fonts, ['Pinned Noto']);
  } finally { hooks.deregister(); rmSync(dir, { recursive: true }); }
});
