import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { output } from './paths.mjs';
export function immutablePut(file, key, run = execFileSync) {
  const dir = mkdtempSync(output + '/r2-probe-');
  const probe = dir + '/object';
  try {
    let exists = true;
    try { run('npx', ['wrangler', 'r2', 'object', 'get', key, '--remote', '--file', probe]); }
    catch (error) {
      if (!String(error.stderr).includes('does not exist')) throw error;
      exists = false;
    }
    if (exists) {
      if (!readFileSync(file).equals(readFileSync(probe))) throw Error(`Immutable object differs: ${key}`);
      return;
    }
    run('npx', ['wrangler', 'r2', 'object', 'put', key, '--remote', '--content-type',
      'application/pdf', '--cache-control', 'public, max-age=31536000, immutable',
      '--file', file], { stdio: 'inherit' });
  } finally { rmSync(dir, { recursive: true }); }
}
