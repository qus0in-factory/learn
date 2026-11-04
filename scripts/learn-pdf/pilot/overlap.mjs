export const overlap = page => page.locator('.deck:not(.cover):not(.eof)').evaluateAll(slides =>
  slides.flatMap(s => {
    const nodes = [...s.querySelectorAll('h1,table,.grid,.diagram,figure,img,image,figcaption,.figure-art,.stat-body,.stat-item,.statement-body,.split-body,.visual-panel,.split-item,.panel,.result,.steps-body,.step-item,.rows-body,.row-item')];
    const issues = [];
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      if (a.contains(b) || b.contains(a)) continue;
      const x = a.getBoundingClientRect(), y = b.getBoundingClientRect();
      if (Math.min(x.right, y.right) - Math.max(x.left, y.left) > 1 &&
          Math.min(x.bottom, y.bottom) - Math.max(x.top, y.top) > 1)
        issues.push({ title: s.querySelector('h1').textContent,
          error: `overlap: ${a.tagName}/${b.tagName}` });
    }
    return issues;
  }));
