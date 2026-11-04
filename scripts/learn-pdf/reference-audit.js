export function auditReferences(pages) {
  for (const page of pages.filter(p => p.dataset.reference)) {
    const reference = page.querySelector('.section-reference');
    if (!reference?.querySelector('a') || reference.scrollWidth > reference.clientWidth + 1) {
      throw Error('Missing or overflowing section reference');
    }
    const content = page.querySelector('.content').getBoundingClientRect();
    const footer = reference.getBoundingClientRect();
    if (content.bottom > footer.top || footer.bottom > page.getBoundingClientRect().bottom) {
      throw Error('Section reference overlaps content or page boundary');
    }
  }
}
