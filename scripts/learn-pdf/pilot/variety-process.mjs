import { escape as e } from './text.mjs';
import { media } from './media.mjs';
export function split(s) {
  const visual = s.diagramSvg ? `<div class="diagram">${s.diagramSvg}</div>` : s.imageUri ? media(s) : `<pre>${e(s.code)}</pre>`;
  return `<div class="split-body ${s.side === 'right' ? 'reverse' : ''}"><div class="visual-panel">${visual}</div><div class="split-items">${s.items.map(v => `<div class="split-item"><b>${e(v.term)}</b><p>${e(v.detail)}</p></div>`).join('')}</div></div>`;
}
export const steps = s => `<div class="steps-body" style="--count:${s.steps.length}">${s.steps.map((v,i) => `<div class="step-item"><span class="number">${i+1}</span><b>${e(v.label)}</b>${v.detail ? `<p>${e(v.detail)}</p>` : ''}${v.tag ? `<code>${e(v.tag)}</code>` : ''}</div>`).join('')}</div>`;
