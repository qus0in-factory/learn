import fs from 'fs';
import { execFileSync } from 'child_process';
import { createMarkdown } from './learn-pdf/markdown-shared.mjs';

const md = createMarkdown(), cnt = (s, p) => (s.match(p) || []).length;
const docs = ['05-remote.md', 'appendix/04-mermaid.md', 'appendix/05-os-differences.md'];

for (const f of docs) {
  const p = `docs/lecture/${f}`, text = fs.readFileSync(p, 'utf8');
  const gh = execFileSync('gh', ['api', '/markdown', '-f', 'mode=gfm', '-f', `text=${text}`], { encoding: 'utf8' });
  const site = md.render(text);
  const gc = cnt(gh, /type="checkbox"/g), sc = cnt(site, /type="checkbox"/g);
  if (gc !== sc) throw new Error(`${f}: cb gh=${gc} site=${sc}`);
  if (sc > 0 && cnt(site, /disabled/g) < sc) throw new Error(`${f}: cb not disabled`);
  if (cnt(gh, /<table/g) !== cnt(site, /<table/g)) throw new Error(`${f}: table mismatch`);
  if (site.includes('**') || gh.includes('**')) throw new Error(`${f}: literal **`);
}
console.log('GFM comparison test passed');
