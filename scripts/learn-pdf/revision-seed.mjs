import { mkdirSync, copyFileSync, writeFileSync } from 'node:fs';

export function seed(root) {
  const dir = root + '/scripts/learn-pdf/';
  for (const path of [dir, root + '/docs/lecture', root + '/learn-site/.vitepress', root + '/dist/learn-pdfs']) {
    mkdirSync(path, { recursive: true });
  }
  for (const file of ['paths.mjs', 'source-revision.mjs', 'source-snapshot.mjs',
    'freeze-state.mjs', 'revision-check.mjs', 'revision-write.mjs', 'artifact.mjs']) {
    copyFileSync(new URL(file, import.meta.url), dir + file);
  }
  writeFileSync(root + '/learn-site/.vitepress/pdf-source.json', '{"frozen":false}');
  writeFileSync(root + '/docs/lecture/01.md', 'original');
  return dir;
}
