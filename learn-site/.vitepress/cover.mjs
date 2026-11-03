import cover from './cover.json' with { type: 'json' }
import { cdnUrl } from './cdn-url.mjs'

const url = (width, format) => cdnUrl(`/cover-${width}.${format}`, import.meta.env.VITE_ASSET_CDN_BASE_URL)
const srcset = (format) => cover.widths.map((w) => `${url(w, format)} ${w}w`).join(', ')

export { cover }
export const coverImage = {
  src: url(cover.widths[0], 'webp'),
  width: cover.intrinsic.width,
  height: cover.intrinsic.height,
  srcset: srcset('webp'),
}
export const coverAvif = { type: 'image/avif', srcset: srcset('avif'), sizes: cover.sizes }
