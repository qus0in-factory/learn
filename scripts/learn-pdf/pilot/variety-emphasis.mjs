import { escape as e } from './text.mjs';
export const stat = s => `<div class="stat-body ${s.mono ? 'mono' : ''}" style="--count:${s.items.length}">${s.items.map(v => `<div class="stat-item"><strong>${e(v.figure)}</strong><b>${e(v.label)}</b><p>${e(v.detail)}</p></div>`).join('')}</div>`;
export function statement(s) {
  const parts = s.emphasis ? s.statement.split(s.emphasis) : [s.statement];
  const text = parts.map(e).join(`<em>${e(s.emphasis)}</em>`);
  return `<div class="statement-body"><div class="assertion">${text}</div><p>${e(s.basis)}</p></div>`;
}
