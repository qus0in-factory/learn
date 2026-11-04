import { fits } from './slide.js';
import { auditReferences } from './reference-audit.js';
export function audit(pages) {
  auditReferences(pages);
  for (const page of pages) {
    if (!fits(page.querySelector('.content'))) throw Error('Final overflow');
  }
  const first = selector => Math.max(1, pages.findIndex(p => p.querySelector(selector)) + 1);
  const dense = pages.reduce((best, p, i) =>
    p.textContent.length > pages[best].textContent.length ? i : best, 0) + 1;
  return [...new Set([1, first('pre'), first('svg'), dense])];
}
