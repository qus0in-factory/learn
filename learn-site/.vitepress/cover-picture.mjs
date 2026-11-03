import { cdnUrl } from './cdn-url.mjs'

export function coverPicture(config) {
  const url = (w, f) => cdnUrl(`/${config.stem || 'cover'}-${w}.${f}`, import.meta.env.VITE_ASSET_CDN_BASE_URL)
  const srcset = f => config.widths.map(w => `${url(w, f)} ${w}w`).join(', ')
  return {
    image: { src: url(config.widths[0], 'webp'), ...config.intrinsic, srcset: srcset('webp') },
    avif: { type: 'image/avif', srcset: srcset('avif'), sizes: config.sizes },
    share: url(config.widths.at(-1), 'webp'),
  }
}
