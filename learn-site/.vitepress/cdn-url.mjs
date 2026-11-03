import assets from './cdn-assets.json' with { type: 'json' }

export function cdnUrl(path, base = '') {
  if (!base) return path
  if (new URL(base).protocol !== 'https:') throw Error('CDN base must use HTTPS')
  const asset = assets.find((item) => item.path === path)
  return asset ? `${base.replace(/\/$/, '')}/${asset.key}` : path
}
