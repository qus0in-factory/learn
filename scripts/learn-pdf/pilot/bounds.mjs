export const bounds = page => page.locator('.deck').evaluateAll(slides => slides.flatMap((s, i) =>
  [...s.querySelectorAll('h1,p,.card,table,pre,figure,img,image,figcaption,.figure-art,.stat-body,.stat-item,.statement-body,.assertion,.split-body,.visual-panel,.split-item,.panel,.result,.steps-body,.step-item,.rows-body,.row-item')].filter(e => {
    const a = e.getBoundingClientRect(), b = s.getBoundingClientRect();
    return a.left < b.left + 40 || a.top < b.top + 30 || a.right > b.right - 40 ||
      a.bottom > b.bottom - 55 || e.scrollWidth > e.clientWidth + 1;
  }).map(e => ({ page: i + 1, text: e.textContent }))));
