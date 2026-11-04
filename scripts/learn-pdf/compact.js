import { moveInto } from './move.js';
export function compact() {
  let previous;
  for (const page of [...document.querySelectorAll('.slide')]) {
    if (previous && !page.dataset.reference && !previous.dataset.reference) {
      moveInto(previous, page);
      if (!page.querySelector('.content').children.length) { page.remove(); continue; }
    }
    previous = page;
  }
}
