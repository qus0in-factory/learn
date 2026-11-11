import { readFile, writeFile } from 'node:fs/promises';
import { gh } from '../learn-pdf/gist-store.mjs';

export const mappingFile = new URL('./gists.json', import.meta.url);
export const mapping = JSON.parse(await readFile(mappingFile, 'utf8'));
export async function saveGist(slug, url, files) {
  const id = url.split('/').at(-1);
  const gist = JSON.parse(gh(['api', `gists/${id}`]));
  if (gist.owner.login !== 'qus0in' || gist.public) throw Error('Wrong Gist owner/visibility');
  for (const { name, token } of files) {
    if (gist.files[name]?.content !== token.content) throw Error(`Gist differs: ${name}`);
  }
  mapping[slug] = { id, url: gist.html_url, files: files.map(f => f.name) };
  await writeFile(mappingFile, JSON.stringify(mapping, null, 2) + '\n');
}
