import { readFile } from 'node:fs/promises'
import { diagramSize } from '../learn-pdf/pilot/diagram-size.mjs'
import { escape } from '../learn-pdf/pilot/text.mjs'
const pilot = new URL('../learn-pdf/pilot/', import.meta.url)
const base = new URL('../../', import.meta.url)
const exts = { png: 'png', webp: 'webp', jpg: 'jpeg', svg: 'svg+xml' }

export async function loadImage(s) {
  if (!s.image) return
  const ext = s.image.split('.').pop()
  if (!exts[ext] || !s.caption) throw Error('bad image')
  const bytes = await readFile(s.image[0] === 'a' ? new URL(s.image, pilot) : new URL(s.image, base))
  if (ext === 'svg') s.imageSvg = diagramSize(bytes.toString('utf8'))
  s.imageUri = 'data:image/' + exts[ext] + ';base64,' + bytes.toString('base64')
}
export const media = s => s.imageUri ? '<figure>' + (s.imageSvg ?
  '<div class="figure-art">' + s.imageSvg + '</div>' :
  '<img src="' + escape(s.imageUri) + '" alt="' + escape(s.caption) + '">') +
  '<figcaption>' + escape(s.caption) + '</figcaption></figure>' : ''
