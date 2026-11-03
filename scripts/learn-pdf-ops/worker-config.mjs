import { readFileSync } from 'node:fs';
import { root } from '../learn-pdf/paths.mjs';
export const workerConfig = () =>
  JSON.parse(readFileSync(root + '/learn-worker/wrangler.jsonc'));
