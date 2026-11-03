import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { output } from '../learn-pdf/paths.mjs';
export function httpGet(url) {
  const dir = mkdtempSync(output + '/http-verify-');
  try {
    const code = execFileSync('curl', ['--retry', '2', '-sS', '--max-time', '60',
      '-D', dir + '/headers', '-o', dir + '/body', '-w', '%{http_code}', url],
    { encoding: 'utf8' });
    return { status: Number(code), body: readFileSync(dir + '/body'),
      headers: readFileSync(dir + '/headers', 'utf8').toLowerCase().split(/\r?\n/) };
  } finally { rmSync(dir, { recursive: true }); }
}
