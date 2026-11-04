import { readFile } from 'node:fs/promises';
import { escape } from './text.mjs';
import { diagramSize } from './diagram-size.mjs';
export async function loadImage(s) {
  if (!s.image) return;
  const ext = s.image.split('.').pop();
  const mime = { png: 'image/png', webp: 'image/webp', jpg: 'image/jpeg', svg: 'image/svg+xml' }[ext];
  if (!mime || !s.caption) throw Error('Image requires supported format and caption');
  const bytes = await readFile(new URL(s.image, import.meta.url));
  if (ext === 'svg') s.imageSvg = diagramSize(bytes.toString('utf8'));
  s.imageUri = `data:${mime};base64,${bytes.toString('base64')}`;
}
export const media = s => s.imageUri ? `<figure>${s.imageSvg ? `<div class="figure-art">${s.imageSvg}</div>` : `<img src="${escape(s.imageUri)}" alt="${escape(s.caption)}">`}<figcaption>${escape(s.caption)}</figcaption></figure>` : '';
