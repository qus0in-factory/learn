import cover from './cover.json' with { type: 'json' }
import { cdnUrl } from './cdn-url.mjs'

const url = (width) => cdnUrl(`/cover-${width}.webp`, import.meta.env.VITE_ASSET_CDN_BASE_URL)

export { cover }
export const coverImage = {
  src: url(cover.widths[0]),
  width: cover.widths[0],
  height: Math.round(cover.widths[0] * cover.intrinsic.height / cover.intrinsic.width),
  srcset: cover.widths.map((width) => `${url(width)} ${width}w`).join(', '),
}
