import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { output, root } from '../learn-pdf/paths.mjs';
export function remoteObject(key) {
  const dir = mkdtempSync(output + '/r2-verify-');
  try {
    execFileSync('npx', ['wrangler', 'r2', 'object', 'get', key, '--remote',
      '--file', dir + '/object'], { cwd: root, stdio: 'pipe' });
    return readFileSync(dir + '/object');
  } finally { rmSync(dir, { recursive: true }); }
}
