import { EASY_DIR, easyPracticeFiles } from './learn/paths.mjs';
import { easyExamples } from './learn-gist-easy/easy-examples.mjs';
import { publishGists } from './learn-gist-easy/gist-runner.mjs';

const dry = process.argv.includes('--dry-run');
const items = (await easyPracticeFiles()).map(rel => ({
  path: `${EASY_DIR}/${rel}`,
  slug: `git-easy/${rel.replace('.md', '')}`,
}));
await publishGists({ items, extract: easyExamples, prefix: 'learn git-easy examples', dry });
