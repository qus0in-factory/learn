import { codeUnits } from './code.js';
export function units(element) {
  const tag = element.tagName;
  if (tag === 'UL' || tag === 'OL') {
    return [...element.children].map((li, i) => {
      const list = element.cloneNode(false);
      if (tag === 'OL') list.start = i + 1;
      list.append(li.cloneNode(true));
      return list;
    });
  }
  if (tag === 'PRE') {
    return codeUnits(element);
  }
  if (tag === 'TABLE') {
    return [...element.querySelectorAll('tbody tr')].map(row => {
      const table = element.cloneNode(true);
      table.sourceTable = element;
      table.querySelector('tbody').replaceChildren(row.cloneNode(true));
      return table;
    });
  }
  return [element];
}
