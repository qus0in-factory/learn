import test from 'node:test';
import assert from 'node:assert/strict';
import { fonts, fontLock } from '../learn-pdf/fonts.mjs';
test('pinned font assets produce deterministic embedded CSS with a mock page', async () => {
  assert.deepEqual(fontLock.assets.map(a => a.file), ['NotoSansKR.ttf', 'NotoSansMono.ttf']);
  assert(fontLock.assets.every(a => /^[a-f0-9]{64}$/.test(a.sha256)));
  const styles = [];
  const page = { addStyleTag: async ({ content }) => styles.push(content),
    evaluate: async () => {} };
  await fonts(page);
  await fonts(page);
  assert.equal(styles[0], styles[1]);
  assert.match(styles[0], /font-family:"Learn Sans"/);
  assert.match(styles[0], /font-family:"Learn Mono"/);
  assert(!/Apple SD Gothic Neo|Menlo|url\(https?:/.test(styles[0]));
});
