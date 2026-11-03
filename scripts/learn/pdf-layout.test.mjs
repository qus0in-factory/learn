import test from 'node:test';
import assert from 'node:assert/strict';
import { fits } from '../learn-pdf/slide.js';
const box = { left: 0, right: 100, bottom: 100 };
const node = bounds => ({ getBoundingClientRect: () => ({ ...box, ...bounds }),
  closest: () => null, clientWidth: 100, scrollWidth: 100 });
test('mock geometry accepts fitting blocks and rejects every overflow edge', () => {
  const content = nodes => ({ getBoundingClientRect: () => box, querySelectorAll: () => nodes });
  assert(fits(content([node({})])));
  assert(fits(content([node({ bottom: 101 })])));
  for (const overflow of [{ bottom: 102 }, { right: 102 }, { left: -2 }]) {
    assert(!fits(content([node(overflow)])));
  }
  assert(!fits(content([{ ...node({}), scrollWidth: 102 }])));
});
