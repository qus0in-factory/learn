import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gh } from '../learn-pdf/gist-store.mjs';
import { mapping, saveGist } from './gist-store.mjs';

export async function publish(slug, files, description, found) {
  let url = mapping[slug]?.url || (found[0] && `https://gist.github.com/qus0in/${found[0].split('\t')[0]}`);
  if (!url) {
    const dir = await mkdtemp(join(tmpdir(), 'git-easy-gist-'));
    try {
      const paths = [];
      for (const { name, token } of files) {
        const path = join(dir, name);
        await writeFile(path, token.content);
        paths.push(path);
      }
      url = gh(['gist', 'create', '--desc', description, ...paths]);
    } finally { await rm(dir, { recursive: true }); }
  }
  await saveGist(slug, url, files);
  console.log(slug, url);
}
