import { readFileSync } from 'node:fs';
const { base } = JSON.parse(readFileSync(new URL('./site-links.json', import.meta.url)));
export function validateReference(link, name) {
  const match = link.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  const url = match && new URL(match[2]);
  if (!match?.[1].startsWith(`STEP ${name.slice(0, 2)} §`)
    || !url || url.origin + url.pathname !== new URL(name, base).href
    || !url.hash || url.search) throw Error(`Invalid section reference: ${name}`);
}
