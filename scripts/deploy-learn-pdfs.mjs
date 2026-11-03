import { execFileSync } from 'node:child_process';
import { checkArtifact } from './learn-pdf/artifact.mjs';
import { root } from './learn-pdf/paths.mjs';
checkArtifact();
execFileSync('npx', ['wrangler', 'deploy', '--config', 'learn-worker/wrangler.jsonc'],
  { cwd: root, stdio: 'inherit' });
