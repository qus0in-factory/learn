import adsConfig from './ads.json' with { type: 'json' }

export function resolveAdsMode(ads) {
  if (ads === 'off') return 'off'
  if (ads === 'quote') return 'quote'
  return 'default'
}

export function isSlotVisible(slotName, relativePath, config = adsConfig, ads) {
  if (resolveAdsMode(ads) === 'off') return false
  if (!config.enabled) return false
  const slot = config.slots?.[slotName]
  if (!slot?.enabled) return false
  const path = '/' + (relativePath || '').replace(/index\.md$/, '').replace(/\.md$/, '')
  const norm = path === '/' ? '/' : path.replace(/\/$/, '')
  const excluded = config.excludedPaths || []
  if (excluded.some(p => norm === p || norm.startsWith(p + '/'))) return false
  return true
}

export function getSlotSpec(slotName, config = adsConfig, ads) {
  const slot = config.slots?.[slotName] || {}
  const width = slot.width || 320
  const height = slot.height || 100
  return {
    width,
    height,
    provider: config.provider || 'placeholder',
    nietzsche: config.nietzsche || null,
    // 실광고 렌더 분기가 추가되면 실광고 대신 인용문을 유지한다.
    forceQuote: resolveAdsMode(ads) === 'quote',
    adfit: slot.adfitUnit ? {
      scriptUrl: config.adfitScriptUrl || '',
      unit: slot.adfitUnit,
      width,
      height,
    } : null,
  }
}
