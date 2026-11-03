import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { archiveSha } from './archive-sha.mjs';
export function installZip(asset, target, cache, run = execFileSync) {
  const temp = mkdtempSync(cache + '/download-');
  try {
    const zip = temp + '/archive.zip';
    run('curl', ['-fsSL', '--retry', '2', '--max-time', '180',
      'https://cdn.playwright.dev/dbazure/download/playwright/' + asset.path, '-o', zip]);
    const sha = archiveSha(readFileSync(zip), asset.sha256);
    run('unzip', ['-q', zip, '-d', target]);
    writeFileSync(target + '/INSTALLATION_COMPLETE', '');
    console.log('Verified bundled asset:', asset.directory, sha);
  } finally { rmSync(temp, { recursive: true }); }
}
