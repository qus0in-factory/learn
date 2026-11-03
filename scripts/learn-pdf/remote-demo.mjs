import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
export function remoteDemo(git, dir) {
  execFileSync('git', ['init', '--bare', '-q', join(dir, '.git/remote.git')]);
  git('remote', 'add', 'origin', './.git/remote.git');
  git('push', '--quiet', '-u', 'origin', 'main');
}
