import { fits } from './slide.js';
export function compact() {
  let previous;
  for (const page of [...document.querySelectorAll('.slide')]) {
    const target = previous?.querySelector('.content');
    if (target) {
      const heading = document.createElement('h2');
      heading.textContent = page.querySelector('h1').textContent;
      const nodes = [...page.querySelector('.content').children];
      target.append(heading, ...nodes);
      if (fits(target)) { page.remove(); continue; }
      page.querySelector('.content').append(...nodes);
      heading.remove();
    }
    previous = page;
  }
}
