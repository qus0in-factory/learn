import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { seed } from './revision-seed.mjs';
export async function fixture() {
  const root = mkdtempSync(tmpdir() + '/pdf-revision-');
  const dir = seed(root);
  const load = name => import(pathToFileURL(dir + name));
  const { sourceRevision } = await load('source-revision.mjs');
  writeFileSync(root + '/learn-site/.vitepress/pdf.json', JSON.stringify({ revision: sourceRevision() }));
  return { root, load };
}
