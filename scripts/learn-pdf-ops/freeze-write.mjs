import { readFileSync, writeFileSync, renameSync } from 'node:fs';
import { root } from '../learn-pdf/paths.mjs';
import { freezeState } from '../learn-pdf/freeze-state.mjs';
import { sha256 } from './freeze-plan.mjs';
export function writeFreeze(plan) {
  const state = freezeState();
  const manifest = JSON.stringify(plan, null, 2) + '\n';
  const config = root + '/learn-site/.vitepress/pdf-source.json';
  const target = root + '/' + state.manifest;
  const saved = [target, config].map(path => [path, readFileSync(path)]);
  const next = { ...state, frozen: true, sourceCommit: plan.sourceCommit,
    revision: plan.revision, sha256: sha256(manifest) };
  try {
    for (const [path, bytes] of [[target, manifest], [config, JSON.stringify(next, null, 2) + '\n']]) {
      writeFileSync(path + '.tmp', bytes);
      renameSync(path + '.tmp', path);
    }
  } catch (error) {
    for (const [path, bytes] of saved) writeFileSync(path, bytes);
    throw error;
  }
}
