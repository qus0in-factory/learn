import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fixture } from '../learn-pdf/revision-fixture.mjs';
export async function updaterFixture() {
  const { root, load } = await fixture();
  copyFileSync(new URL('../learn-pdf/revision-update.mjs', import.meta.url),
    root + '/scripts/learn-pdf/revision-update.mjs');
  mkdirSync(root + '/scripts/learn');
  for (const name of ['readme', 'url']) {
    writeFileSync(`${root}/scripts/learn/${name}.test.mjs`, 'export {};');
  }
  writeFileSync(root + '/README.md', 'https://pdf.test/a.pdf?revision=abcdef0\n'.repeat(12));
  const run = (...args) => spawnSync(process.execPath,
    ['scripts/learn-pdf/revision-update.mjs', ...args], { cwd: root, encoding: 'utf8' });
  return { root, load, run };
}
