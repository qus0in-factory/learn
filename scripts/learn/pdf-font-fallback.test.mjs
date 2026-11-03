import test from 'node:test';
import assert from 'node:assert/strict';
import { auditFonts } from '../learn-pdf/font-audit.mjs';
import { fontSession } from '../learn-pdf-ops/font-session.mjs';
test('mock glyph audit rejects fallback and always detaches', async () => {
  const font = { glyphCount: 1, familyName: 'System Font', isCustomFont: false };
  const bad = fontSession([font]);
  await assert.rejects(auditFonts(bad.page), /System font fallback/);
  assert(bad.session.detached);
  const good = fontSession([{ ...font, familyName: 'Noto Sans KR', isCustomFont: true },
    { ...font, glyphCount: 0 }]);
  assert.deepEqual(await auditFonts(good.page), ['Noto Sans KR']);
  assert(good.session.detached);
});
