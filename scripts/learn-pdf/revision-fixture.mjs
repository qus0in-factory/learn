import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
export async function fixture() {
  const root = mkdtempSync(tmpdir() + '/pdf-revision-');
  const dir = root + '/scripts/learn-pdf/';
  for (const path of [dir, root + '/docs/lecture', root + '/learn-site/.vitepress', root + '/dist/learn-pdfs']) {
    mkdirSync(path, { recursive: true });
  }
  for (const file of ['paths.mjs', 'source-revision.mjs', 'revision-check.mjs', 'artifact.mjs']) {
    copyFileSync(new URL(file, import.meta.url), dir + file);
  }
  writeFileSync(root + '/docs/lecture/01.md', 'original');
  const load = name => import(pathToFileURL(dir + name));
  const { sourceRevision } = await load('source-revision.mjs');
  writeFileSync(root + '/learn-site/.vitepress/pdf.json', JSON.stringify({ revision: sourceRevision() }));
  return { root, load };
}
