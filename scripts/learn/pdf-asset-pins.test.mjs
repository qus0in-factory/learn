import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import assets from '../learn-pdf-ops/browser-assets.json' with { type: 'json' };
import pinned from '../learn-pdf-ops/browser-assets.pinned.json' with { type: 'json' };
import vendor from '../learn-pdf-ops/browser-vendor.json' with { type: 'json' };
import { browserSpec } from '../learn-pdf-ops/browser-spec.mjs';
test('actual browser assets retain official SHA pins and locked Playwright manifest versions', () => {
  const lock = JSON.parse(readFileSync(new URL('../learn-pdf/package-lock.json', import.meta.url)));
  assert.equal(lock.packages[''].dependencies.playwright, vendor.playwright);
  assert.equal(lock.packages['node_modules/playwright-core'].version, vendor.playwright);
  assert.deepEqual(assets, pinned);
  for (const asset of assets) assert(browserSpec(vendor, asset.directory).executable);
});
