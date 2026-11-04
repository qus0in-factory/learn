export async function geometry(page) {
  return page.locator('.deck').evaluateAll(slides => slides.flatMap((s, i) => {
    const note = s.querySelector('.note')?.getBoundingClientRect();
    const overlaps = [...s.querySelectorAll('.grid,.diagram,table')].filter(e => {
      const box = e.getBoundingClientRect();
      return note && box.bottom > note.top + 1;
    }).map(() => ({ page: i + 1, error: 'content overlaps note' }));
    const small = [...s.querySelectorAll('.diagram text')].some(e => {
      const matrix = e.getScreenCTM();
      return parseFloat(getComputedStyle(e).fontSize) * Math.hypot(matrix.a, matrix.b) < 27.5;
    });
    return overlaps.concat(small ? [{ page: i + 1, error: 'diagram label below 28px' }] : []);
  }));
}
