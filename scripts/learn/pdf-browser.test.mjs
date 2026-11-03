import test from 'node:test';
import assert from 'node:assert/strict';
import { browserSpec } from '../learn-pdf-ops/browser-spec.mjs';
const manifest = { browsers: [
  { name: 'chromium', revision: '1194', browserVersion: '141.0.7390.37' },
  { name: 'chromium-headless-shell', revision: '1194', browserVersion: '141.0.7390.37' },
  { name: 'ffmpeg', revision: '1011' },
] };
test('fixed Chromium revision resolves only bundled executable paths', () => {
  const full = browserSpec(manifest, 'chromium-1194');
  assert.equal(full.version, '141.0.7390.37');
  assert.equal(full.executable, 'chromium-1194/chrome-linux/chrome');
  assert.match(browserSpec(manifest, 'chromium_headless_shell-1194').executable, /headless_shell$/);
  assert.equal(browserSpec(manifest, 'ffmpeg-1011').executable, 'ffmpeg-1011/ffmpeg-linux');
  for (const bad of ['chrome', 'chromium-1195', '../../chrome']) {
    assert.throws(() => browserSpec(manifest, bad), /manifest mismatch/);
  }
});
