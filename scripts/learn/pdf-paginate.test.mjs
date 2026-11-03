import test from 'node:test';
import assert from 'node:assert/strict';
import { reexportMocks } from '../learn-pdf-ops/module-mocks.mjs';
import { pages, source } from '../learn-pdf-ops/pagination-fixture.mjs';
test('paginate splits overflowing units, preserves them and rejects oversize', async () => {
  const fixture = new URL('../learn-pdf-ops/pagination-fixture.mjs', import.meta.url).href;
  const hooks = reexportMocks(['units.js', 'slide.js', 'place.js'], fixture,
    new URL('../learn-pdf/', import.meta.url));
  try {
    const { paginate } = await import('../learn-pdf/paginate.js');
    paginate(source([6, 6, 4]));
    assert.deepEqual(pages.map(p => p.title), ['Pinned title', 'Pinned title · 계속']);
    assert.deepEqual(pages.map(p => p.content.children.map(u => u.height)), [[6], [6, 4]]);
    assert.throws(() => paginate(source([11])), /Oversized block/);
    assert.throws(() => paginate(source([10, 11])), /Oversized unit/);
  } finally { hooks.deregister(); }
});
