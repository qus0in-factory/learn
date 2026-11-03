import assets from '../../learn-site/.vitepress/cdn-assets.json' with { type: 'json' }
import settings from './settings.json' with { type: 'json' }

export { assets, settings }
export function checkedAssets() {
  if (assets.length !== settings.expectedCount) throw Error('Unexpected asset count')
  for (const asset of assets) {
    if (!asset.key.startsWith(`${settings.prefix}/${asset.sha256}/`)) {
      throw Error('Unsafe static asset key')
    }
  }
  return assets
}
