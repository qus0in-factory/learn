import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fontLock } from './fonts.mjs';
import { here, output } from './paths.mjs';
export function provenance(browser) {
  const lock = readFileSync(here + 'package-lock.json');
  writeFileSync(output + '/toolchain.json', JSON.stringify({
    browser: browser.version(), node: process.version, platform: process.platform,
    arch: process.arch, fonts: fontLock,
    dependencies: JSON.parse(lock).packages[''].dependencies,
    lockSha256: createHash('sha256').update(lock).digest('hex'),
  }, null, 2));
}
