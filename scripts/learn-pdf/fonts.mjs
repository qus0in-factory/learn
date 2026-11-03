import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const dir = new URL('./fonts/', import.meta.url);
export const fontLock = JSON.parse(readFileSync(new URL('lock.json', dir)));
const css = fontLock.assets.map(({ file, sha256 }, i) => {
  const data = readFileSync(new URL(file, dir));
  if (createHash('sha256').update(data).digest('hex') !== sha256) {
    throw Error(`Pinned font checksum mismatch: ${file}`);
  }
  return `@font-face {font-family:"Learn ${i ? 'Mono' : 'Sans'}";
    src:url(data:font/ttf;base64,${data.toString('base64')});font-weight:100 900;}`;
}).join('\n');
export async function fonts(page) {
  await page.addStyleTag({ content: css });
  await page.evaluate(async () => {
    await Promise.all(['Learn Sans', 'Learn Mono'].map(f => document.fonts.load(`25px "${f}"`)));
  });
}
