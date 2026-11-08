import adsConfig from './ads.json' with { type: 'json' }

export function isSlotVisible(slotName, relativePath, config = adsConfig) {
  if (!config.enabled) return false
  const slot = config.slots?.[slotName]
  if (!slot?.enabled) return false
  const path = '/' + (relativePath || '').replace(/index\.md$/, '').replace(/\.md$/, '')
  const norm = path === '/' ? '/' : path.replace(/\/$/, '')
  const excluded = config.excludedPaths || []
  if (excluded.some(p => norm === p || norm.startsWith(p + '/'))) return false
  return true
}

export function getSlotSpec(slotName, config = adsConfig) {
  const slot = config.slots?.[slotName] || {}
  return {
    width: slot.width || 320,
    height: slot.height || 100,
    provider: config.provider || 'placeholder',
    quote: config.quote || null,
  }
}
