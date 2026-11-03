import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { lectureFiles, LECTURE_DIR } from './learn/paths.mjs';
import { examples } from './learn-pdf/examples.mjs';
import { gh } from './learn-pdf/gist-store.mjs';
import { publish } from './learn-pdf/gist-publish.mjs';
if (gh(['api', 'user', '--jq', '.login']) !== 'qus0in') throw Error('Expected qus0in');
const existing = gh(['gist', 'list', '--limit', '1000']).split('\n');
for (const file of await lectureFiles()) {
  const slug = file.replace('.md', '');
  const files = examples(await readFile(join(LECTURE_DIR, file), 'utf8'));
  if (!files.length) continue;
  const description = `learn slide examples: ${slug}`;
  const found = existing.filter(l => l.split('\t')[1] === description);
  if (found.length > 1) throw Error(`Duplicate Gists: ${slug}`);
  await publish(slug, files, description, found);
}
