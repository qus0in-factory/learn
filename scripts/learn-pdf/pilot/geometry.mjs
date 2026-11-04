export async function geometry(page) {
  return page.locator('.deck').evaluateAll(slides => slides.flatMap((s, i) => {
    const note = s.querySelector('.note')?.getBoundingClientRect();
    return [...s.querySelectorAll('.grid,.diagram,table')].filter(e => {
      const box = e.getBoundingClientRect();
      return note && box.bottom > note.top + 1;
    }).map(() => ({ page: i + 1, error: 'content overlaps note' }));
  }));
}
