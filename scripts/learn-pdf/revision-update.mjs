import { sourceRevision } from './source-revision.mjs';
import { root } from './paths.mjs';
import { execFileSync } from 'node:child_process';
import { requireMutable } from './freeze-state.mjs';
import { writeRevision } from './revision-write.mjs';
requireMutable();
if (process.argv.slice(2).join(' ') !== '--update-revision') {
  throw Error('Explicit --update-revision required');
}
const revision = sourceRevision();
writeRevision(revision);
console.log('PDF revision updated:', revision);
execFileSync(process.execPath, ['--test', 'scripts/learn/readme.test.mjs',
  'scripts/learn/url.test.mjs'], { cwd: root, stdio: 'inherit' });
