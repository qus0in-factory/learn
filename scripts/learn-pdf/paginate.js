import { units } from './units.js';
import { slide, fits } from './slide.js';
import { place } from './place.js';
export function paginate(source) {
  let title = '', content;
  for (const block of [...source.children]) {
    if (/^H[1-6]$/.test(block.tagName)) {
      title = block.textContent;
      content = null;
      continue;
    }
    for (const unit of units(block)) {
      content ??= slide(title);
      const undo = place(content, unit);
      if (!fits(content)) {
        undo();
        if (!content.children.length) throw Error(`Oversized block: ${title}`);
        content = slide(`${title} · 계속`);
        content.append(unit);
        if (!fits(content)) throw Error(`Oversized unit: ${title}`);
      }
    }
  }
}
