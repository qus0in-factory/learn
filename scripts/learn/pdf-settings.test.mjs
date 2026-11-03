import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sourceRevision } from '../learn-pdf/source-revision.mjs';
import { pdfConfig } from '../../learn-site/.vitepress/pdf-url.mjs';
import { freezeState } from '../learn-pdf/freeze-state.mjs';
test('page size contract and input revision are deterministic without rendering', () => {
  const css = readFileSync(new URL('../learn-pdf/style.css', import.meta.url), 'utf8');
  const [, width, height] = css.match(/@page\s*\{\s*size:\s*(\d+)px\s+(\d+)px/);
  assert.deepEqual([Number(width) * 72 / 96, Number(height) * 72 / 96], [960, 540]);
  assert.equal(Number(width) / Number(height), 16 / 9);
  assert.equal(sourceRevision(), sourceRevision());
  assert.equal(sourceRevision(), pdfConfig.revision);
  assert.equal(freezeState().frozen, true);
});
