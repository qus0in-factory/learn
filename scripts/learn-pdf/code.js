export function codeUnits(element, limit = 12) {
  const lines = element.textContent.split('\n'), chunks = [];
  while (lines.length) {
    let end = Math.min(limit, lines.length);
    if (lines.length > limit) {
      for (let i = end; i >= Math.ceil(limit / 2); i--) {
        if (!lines[i - 1].trim() || /^\s*[}\]];?\s*$/.test(lines[i - 1])) {
          end = i;
          break;
        }
      }
    }
    const pre = element.cloneNode(false);
    pre.textContent = lines.splice(0, end).join('\n');
    chunks.push(pre);
  }
  return chunks;
}
