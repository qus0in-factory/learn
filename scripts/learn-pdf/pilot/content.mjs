import { escape as e, detail } from './text.mjs';
import { media } from './media.mjs';
export function content(s) {
  const cards = s.cards?.map(([a,b],i) => `<div class="card">${s.icons?.[i] ? `<img class="icon" src="${e(s.icons[i])}">` : ''}<b>${e(a)}</b><p>${detail(b)}</p></div>`).join('');
  const rows = s.rows?.map(r => `<tr>${r.map(v => `<td>${e(v)}</td>`).join('')}</tr>`).join('');
  return `${media(s)}${s.diagramSvg ? `<div class="diagram">${s.diagramSvg}</div>` : ''}
    ${cards ? `<div class="grid">${cards}</div>` : ''}
    ${rows ? `<table>${rows}</table>` : ''}
    ${s.code ? `<div class="grid">${s.code.map(c => `<pre>${e(c)}</pre>`).join('')}</div>` : ''}`;
}
