import { escape } from './text.mjs';
import { content } from './content.mjs';
export function markup(s, i, total) {
  const e = escape;
  return `<section class="deck ${e(s.type)}"><div class="eyebrow">${e(s.step || 'STEP 01')} / ${e(s.label || '개념에서 실습으로')}</div><h1>${e(s.title)}</h1>
  ${s.text ? `<p>${e(s.text)}</p>` : ''}
  ${content(s)}
  ${s.note ? `<p class="note">${e(s.note)}</p>` : ''}
  <footer>${i + 1} / ${total}</footer></section>`;
}
