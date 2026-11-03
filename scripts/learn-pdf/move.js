import { fits } from './slide.js';
export function moveInto(previous, page) {
  const target = previous.querySelector('.content');
  const source = page.querySelector('.content');
  const title = page.querySelector('h1');
  const heading = document.createElement('h2');
  heading.textContent = title.textContent;
  target.append(heading);
  let moved = 0;
  for (const node of [...source.children]) {
    target.append(node);
    if (!fits(target)) { source.prepend(node); break; }
    moved++;
  }
  if (!moved) heading.remove();
  else if (source.children.length) title.textContent += ' · 계속';
}
