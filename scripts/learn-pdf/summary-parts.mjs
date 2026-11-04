import { validateSummary } from './summary-validate.mjs';
export function summaryParts(raw, name) {
  const front = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!front || !front[1].split('\n').includes(`lecture: ${name}.md`)) {
    throw Error(`Missing lecture frontmatter: ${name}`);
  }
  const text = raw.slice(front[0].length).trim();
  const chunks = text.split(/(?=^#{1,2} )/m).filter(Boolean);
  const parts = chunks.map(chunk => {
    const match = chunk.match(/^(#{1,2}) (.+)\n\s*교안: (\[[^\n]+\]\([^\n]+\))\s*\n([\s\S]*)$/);
    if (!match) throw Error(`Missing slide title/reference: ${name}`);
    return { level: match[1].length, title: match[2], link: match[3], body: match[4] };
  });
  validateSummary(parts, name);
  return parts;
}
