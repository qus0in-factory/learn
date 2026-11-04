import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { root } from '../learn-pdf/paths.mjs';
export function sourceFiles() {
  const files = [];
  function walk(dir) {
    const entries = readdirSync(resolve(root, dir), { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      if (['node_modules', '__pycache__'].includes(entry.name)) continue;
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else files.push({ path, bytes: readFileSync(resolve(root, path)) });
    }
  }
  walk('docs/lecture');
  walk('scripts/learn-pdf');
  return files;
}
