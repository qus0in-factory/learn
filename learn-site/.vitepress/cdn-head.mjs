import { cdnUrl } from './cdn-url.mjs'

export function cdnHead({ head }) {
  for (const [tag, attributes] of head) {
    if (tag === 'link' && attributes.as === 'font') {
      attributes.href = cdnUrl(attributes.href, process.env.VITE_ASSET_CDN_BASE_URL)
    }
  }
}
