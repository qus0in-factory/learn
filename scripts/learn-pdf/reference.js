export function referenceFooter(page, reference) {
  if (!reference) return;
  page.dataset.reference = reference;
  const match = reference.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (!match) throw Error('Invalid slide reference');
  const footer = document.createElement('aside');
  footer.className = 'section-reference';
  const link = document.createElement('a');
  link.textContent = `교안: ${match[1]}`;
  link.href = match[2];
  footer.append(link);
  page.append(footer);
}
