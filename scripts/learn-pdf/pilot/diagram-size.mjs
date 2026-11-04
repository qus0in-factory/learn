export function diagramSize(svg) {
  const box = svg.match(/viewBox="([^"]+)"/)?.[1].split(/\s+/).map(Number);
  if (!box) throw Error('Diagram viewBox missing');
  const scale = 28 / 30;
  const size = `width:${box[2] * scale}px;height:${box[3] * scale}px`;
  return svg.replace(/<svg\b([^>]*)>/, (_, attrs) =>
    `<svg${attrs.replace(/\sstyle="[^"]*"/, '')} style="${size}">`);
}
