import { md } from './markdown.mjs';
import { validateReference } from './summary-reference.mjs';
export function validateSummary(parts, name) {
  if (!parts.length || parts[0].level !== 1 || parts.filter(p => p.level === 1).length !== 1) {
    throw Error(`Expected one cover: ${name}`);
  }
  for (const part of parts) {
    const tokens = md.parse(part.body, {});
    if (!part.body.trim() || /::[^:\n]+::/.test(part.body)
      || tokens.some(t => /^(html_block|heading_open|hr|code_block)$/.test(t.type)
      || t.type === 'fence' && t.info.trim() !== 'mermaid'
      || t.children?.some(c => c.type === 'html_inline'))) {
      throw Error(`Unsupported summary markup: ${name}/${part.title}`);
    }
    validateReference(part.link, name);
  }
}
