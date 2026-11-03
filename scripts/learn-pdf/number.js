export function numberPages(pages) {
  pages.forEach((page, i) => {
    const footer = document.createElement('footer');
    footer.textContent = `Git · ${i + 1} / ${pages.length}`;
    page.append(footer);
  });
}
