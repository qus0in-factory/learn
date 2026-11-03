import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { demoOutput } from './demo-output.mjs';
export async function demo(topic) {
  const dir = await mkdtemp(join(tmpdir(), 'learn-demo-'));
  const git = (...args) => execFileSync('git', args, { cwd: dir, encoding: 'utf8' });
  try {
    git('init', '-q', '-b', 'main');
    git('config', 'user.name', 'Learner');
    git('config', 'user.email', 'learner@example.com');
    await writeFile(join(dir, 'index.html'), '<h1>Portfolio</h1>\n');
    git('add', '.');
    git('commit', '-qm', 'feat: add portfolio page');
    await writeFile(join(dir, 'README.md'), '# Portfolio\n');
    return demoOutput(git, topic);
  } finally { await rm(dir, { recursive: true }); }
}
