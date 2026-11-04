import { readdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { root } from './paths.mjs';
import { frozenRevision } from './source-snapshot.mjs';
export function sourceRevision() {
  const frozen = frozenRevision();
  if (frozen) return frozen;
  const hash = createHash('sha1');
  function walk(dir) {
    for (const entry of readdirSync(resolve(root, dir), { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      if (['node_modules', '__pycache__'].includes(entry.name)) continue;
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else hash.update(path + '\0').update(readFileSync(resolve(root, path))).update('\0');
    }
  }
  walk('docs/lecture');
  walk('scripts/learn-pdf');
  return hash.digest('hex');
}
