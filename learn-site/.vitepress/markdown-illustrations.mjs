import { cdnUrl } from './cdn-url.mjs'
import config from './illustrations.json' with { type: 'json' }
import { illustrationStem } from './illustration-stem.mjs'

const TAG = /<(Illustration|Screenshot) name="([^"]+)" alt="([^"]*)" \/>/g

// Markdown export: figures become plain image links.
export function markdownIllustrations(text) {
  const width = config.widths.at(-1)
  return text.replace(TAG, (all, tag, name, alt) => {
    const stem = tag === 'Screenshot' ? `shot-${name}` : illustrationStem(name)
    const text = alt.replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&amp;', '&')
    return `![${text}](${cdnUrl(`/${stem}-${width}.webp`, process.env.VITE_ASSET_CDN_BASE_URL)})`
  })
}
