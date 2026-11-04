export async function presentationAudit(page) {
  return page.locator('.deck').evaluateAll(slides => slides.flatMap((s, i) => {
    const issues = [];
    if (s.querySelector('.eyebrow,.note') || s.querySelector(':scope > p'))
      issues.push('auxiliary text');
    if (s.matches('.cover,.eof') && !s.querySelector('.subject-icon svg'))
      issues.push('subject SVG missing');
    if (s.matches('.eof') && s.textContent.trim() !== '- EOF -')
      issues.push('EOF text');
    for (const cell of s.querySelectorAll('td')) {
      const c = getComputedStyle(cell);
      if (parseFloat(c.borderLeftWidth) || parseFloat(c.borderRightWidth)) issues.push('table grid');
    }
    return issues.map(error => ({ page: i + 1, error }));
  }));
}
