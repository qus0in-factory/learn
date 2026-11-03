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
    const lines = element.textContent.split('\n');
    return Array.from({ length: Math.ceil(lines.length / 12) }, (_, i) => {
      const pre = document.createElement('pre');
      pre.textContent = lines.slice(i * 12, i * 12 + 12).join('\n');
      return pre;
    });
  }
  if (tag === 'TABLE') {
    return [...element.querySelectorAll('tbody tr')].map(row => {
      const table = element.cloneNode(true);
      table.querySelector('tbody').replaceChildren(row.cloneNode(true));
      return table;
    });
  }
  return [element];
}
