import { execFileSync } from 'node:child_process';
import { root } from '../learn-pdf/paths.mjs';
export function verifyProvenance(commit, files) {
  if (!/^[a-f0-9]{40}$/.test(commit)) throw Error('Expected full source commit');
  const git = args => execFileSync('git', args, { cwd: root, maxBuffer: 256 * 1024 * 1024 });
  const paths = git(['ls-tree', '-r', '--name-only', '-z', commit,
    '--', 'docs/lecture', 'scripts/learn-pdf']).toString().split('\0')
    .filter(p => p && !p.split('/').some(n => ['node_modules', '__pycache__'].includes(n)));
  if (JSON.stringify(paths.sort()) !== JSON.stringify(files.map(f => f.path).sort())) {
    throw Error('Source commit file list mismatch');
  }
  for (const { path, bytes } of files) {
    if (!git(['show', `${commit}:${path}`]).equals(bytes)) {
      throw Error(`Source commit bytes mismatch: ${path}`);
    }
  }
}
