export const pages = [];
export const units = block => block.items;
export function slide(title) {
  const content = { children: [], append(unit) { this.children.push(unit); } };
  pages.push({ title, content });
  return content;
}
export const fits = content => content.children.reduce((sum, u) => sum + u.height, 0) <= 10;
export function place(content, unit) {
  content.append(unit);
  return () => content.children.splice(content.children.indexOf(unit), 1);
}
export const source = heights => ({ children: [
  { tagName: 'H1', textContent: 'Pinned title' },
  { tagName: 'P', items: heights.map(height => ({ height })) },
] });
