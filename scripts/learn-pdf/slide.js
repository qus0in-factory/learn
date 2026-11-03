export function slide(title) {
  const page = document.createElement('section');
  page.className = 'slide';
  const heading = document.createElement('h1');
  heading.textContent = title;
  const content = document.createElement('div');
  content.className = 'content';
  page.append(heading, content);
  document.body.append(page);
  return content;
}
export function fits(content) {
  const box = content.getBoundingClientRect();
  return [...content.querySelectorAll('*')].every(node => {
    if (node.closest('svg') && node.tagName.toLowerCase() !== 'svg') return true;
    if (node.scrollWidth > node.clientWidth + 1 && node.clientWidth) return false;
    const r = node.getBoundingClientRect();
    return r.bottom <= box.bottom + 1 && r.right <= box.right + 1
      && r.left >= box.left - 1;
  });
}
