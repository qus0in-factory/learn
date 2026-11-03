import test from 'node:test';
import assert from 'node:assert/strict';
import { codeUnits } from '../learn-pdf/code.js';
test('code segmentation preserves lines, respects limits and prefers closing boundaries', () => {
  const text = ['if {', '  x', '}', 'next {', '  y', '}'].join('\n');
  const pre = { textContent: text, cloneNode: () => ({}) };
  const chunks = codeUnits(pre, 3).map(c => c.textContent);
  assert.deepEqual(chunks, ['if {\n  x\n}', 'next {\n  y\n}']);
  assert.equal(chunks.join('\n'), text);
  assert.equal(codeUnits(pre, 12).length, 1);
});
