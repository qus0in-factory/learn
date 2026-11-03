export async function inspect(page, title) {
  return page.evaluate(expected => {
    if (document.title !== expected) throw Error('Document title mismatch');
    const snippets = [...document.querySelectorAll('pre')];
    const maxCodeLines = Math.max(0, ...snippets.map(n => n.textContent.trim().split('\n').length));
    if (maxCodeLines > 3) throw Error('Slide code exceeds three lines');
    const images = [...document.querySelectorAll('img')];
    if (images.some(i => !i.complete || !i.naturalWidth)) throw Error('Missing screenshot');
    return { maxCodeLines, screenshots: images.length };
  }, title);
}
