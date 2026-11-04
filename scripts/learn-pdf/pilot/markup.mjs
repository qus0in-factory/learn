import { escape } from './text.mjs';
import { content } from './content.mjs';
export function markup(s, i, total) {
  const e = escape;
  const end = s.type === 'eof', cover = s.type === 'cover';
  const icon = s.subjectSvg ? `<div class="subject-icon">${s.subjectSvg}</div>` : '';
  return `<section class="deck ${e(s.type)}">${icon}<h1>${end ? '- EOF -' : e(s.title)}</h1>
  ${end || cover ? '' : content(s)}
  ${end ? '' : `<footer>${i + 1} / ${total}</footer>`}</section>`;
}
