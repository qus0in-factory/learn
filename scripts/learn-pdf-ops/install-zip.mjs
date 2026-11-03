import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
export function installZip(asset, target, cache) {
  const temp = mkdtempSync(cache + '/download-');
  try {
    const zip = temp + '/archive.zip';
    execFileSync('curl', ['-fsSL', '--retry', '2', '--max-time', '180',
      'https://cdn.playwright.dev/dbazure/download/playwright/' + asset.path, '-o', zip]);
    const sha = createHash('sha256').update(readFileSync(zip)).digest('hex');
    if (sha !== asset.sha256) throw Error('Pinned browser archive checksum mismatch');
    execFileSync('unzip', ['-q', zip, '-d', target]);
    writeFileSync(target + '/INSTALLATION_COMPLETE', '');
    console.log('Verified bundled asset:', asset.directory, sha);
  } finally { rmSync(temp, { recursive: true }); }
}
