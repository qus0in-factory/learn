const normalize = text => text.replace(/\s/g, '');
export function sourceText(source) {
  const copy = source.cloneNode(true);
  copy.querySelectorAll('thead').forEach(n => n.remove());
  return normalize([...copy.children]
    .filter(n => !/^H[1-6]$/.test(n.tagName))
    .map(n => n.textContent).join(''));
}
export function checkContent(pages, expected) {
  const actual = pages.map(p => sourceText(p.querySelector('.content'))).join('');
  if (actual !== expected) throw Error('Slide content differs from source');
}
