import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import assets from './browser-assets.json' with { type: 'json' };
import { root } from '../learn-pdf/paths.mjs';
import { installZip } from './install-zip.mjs';
import { browserSpec } from './browser-spec.mjs';
if (process.platform !== 'linux' || process.arch !== 'x64') throw Error('Ubuntu x64 only');
const manifest = JSON.parse(readFileSync(root + '/scripts/learn-pdf/node_modules/playwright-core/browsers.json'));
const cache = homedir() + '/.cache/ms-playwright';
mkdirSync(cache, { recursive: true });
for (const asset of assets) {
  browserSpec(manifest, asset.directory);
  const target = cache + '/' + asset.directory;
  if (existsSync(target)) throw Error('Expected empty runner browser cache');
  installZip(asset, target, cache);
}
