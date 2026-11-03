import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { root } from './paths.mjs';
import { fences } from './examples.mjs';
export async function webPreview(text) {
  const base = fences(await readFile(resolve(root, 'docs/lecture/02-local-repository.md'), 'utf8'));
  const local = fences(text);
  const html = local.find(t => t.info === 'html' && t.content.includes('<!doctype'))
    || base.find(t => t.info === 'html');
  const extra = local.filter(t => t.info === 'html' && t !== html)
    .map(t => t.content).join('\n');
  const css = [...base, ...local].filter(t => t.info === 'css').map(t => t.content).join('\n');
  return html.content.replace('</body>', `${extra}</body>`) + `<style>${css}</style>`;
}
