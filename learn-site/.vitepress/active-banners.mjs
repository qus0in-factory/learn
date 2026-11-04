export function activeBanners(config, now) {
  if (!config.enabled || !now) return []
  return config.banners.filter(banner => {
    if (!banner.alt?.trim() || !/^\/(?!\/)/.test(banner.image)) return false
    try { if (new URL(banner.link).protocol !== 'https:') return false } catch { return false }
    const start = banner.start ? Date.parse(banner.start) : -Infinity
    const end = banner.end ? Date.parse(banner.end) : Infinity
    return start <= now && now < end
  })
}
