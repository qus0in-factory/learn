import { readFileSync } from 'node:fs';
import { root } from './paths.mjs';

export function freezeState() {
  return JSON.parse(readFileSync(root + '/learn-site/.vitepress/pdf-source.json'));
}
export function requireMutable() {
  if (freezeState().frozen !== false) throw Error('PDF frozen; release only through #33');
}
