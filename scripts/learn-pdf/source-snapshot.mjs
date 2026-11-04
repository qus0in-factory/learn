import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { root } from './paths.mjs';
import { freezeState } from './freeze-state.mjs';

export function frozenRevision() {
  const config = freezeState();
  if (config.frozen === false) return null;
  if (config.frozen !== true) throw Error('Invalid PDF freeze state');
  const bytes = readFileSync(resolve(root, config.manifest));
  const saved = JSON.parse(bytes);
  if (createHash('sha256').update(bytes).digest('hex') !== config.sha256 ||
      saved.revision !== config.revision || saved.sourceCommit !== config.sourceCommit ||
      !/^[a-f0-9]{40}$/.test(saved.revision) || !saved.files?.length) {
    throw Error('Frozen PDF source snapshot mismatch');
  }
  return saved.revision;
}
