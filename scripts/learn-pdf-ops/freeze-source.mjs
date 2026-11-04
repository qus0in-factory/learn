import { parseArgs } from 'node:util';
import { freezePlan } from './freeze-plan.mjs';
import { writeFreeze } from './freeze-write.mjs';
import { frozenRevision } from '../learn-pdf/source-snapshot.mjs';
import { checkArtifact } from '../learn-pdf/artifact.mjs';
const { values } = parseArgs({ options: {
  'dry-run': { type: 'boolean' }, 'freeze-source': { type: 'boolean' },
  'source-commit': { type: 'string' }
} });
const dry = values['dry-run'];
if (!!dry === !!values['freeze-source'] || (!dry && !values['source-commit'])) {
  throw Error('Use --dry-run or --freeze-source --source-commit <40hex>');
}
const plan = await freezePlan(values['source-commit']);
if (!dry) {
  const checked = await freezePlan(plan.sourceCommit);
  if (JSON.stringify(checked) !== JSON.stringify(plan)) throw Error('Source changed');
  writeFreeze(plan);
  frozenRevision();
  checkArtifact();
}
console.log(JSON.stringify({ dryRun: !!dry, ...plan }));
