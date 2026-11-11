import { readFile } from 'node:fs/promises';
import { gh } from '../learn-pdf/gist-store.mjs';
import { publish } from '../learn-pdf/gist-publish.mjs';

export async function publishGists({ items, extract, prefix, dry }) {
  if (!dry && gh(['api', 'user', '--jq', '.login']) !== 'qus0in') throw Error('Expected qus0in');
  const existing = dry ? [] : gh(['gist', 'list', '--limit', '1000']).split('\n');
  for (const { path, slug } of items) {
    const files = extract(await readFile(path, 'utf8'));
    if (!files.length) continue;
    const desc = `${prefix}: ${slug}`;
    if (dry) {
      const summary = files.map(f => `${f.name} (${f.token.content.trim().split('\n').length} lines)`).join(', ');
      console.log(`[dry-run] ${slug}: ${summary}`);
      continue;
    }
    const found = existing.filter(l => l.split('\t')[1] === desc);
    if (found.length > 1) throw Error(`Duplicate Gists: ${slug}`);
    await publish(slug, files, desc, found);
  }
}
