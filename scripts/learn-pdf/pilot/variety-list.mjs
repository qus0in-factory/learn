import { escape as e } from './text.mjs';
export function compare(s) {
  const panel = (v, side) => `<div class="panel ${s.emphasis === side ? 'accent' : ''}"><b>${e(v.label)}</b>${v.lines.map(t => `<p>${e(t)}</p>`).join('')}${v.cmd ? `<pre>${e(v.cmd)}</pre>` : ''}</div>`;
  return `<div class="compare-body"><div class="compare-pair">${panel(s.left, 'left')}${panel(s.right, 'right')}</div>${s.result ? `<div class="result">${e(s.result)}</div>` : ''}</div>`;
}
export const rows = s => `<div class="rows-body" style="--count:${s.rows.length}">${s.rows.map((v,i) => `<div class="row-item">${s.numbered ? `<span class="number">${i+1}</span>` : ''}<b>${e(v.term)}</b><p>${e(v.detail)}</p></div>`).join('')}</div>`;
