import config from './og.json' with { type: 'json' }
import { share } from './course-share.mjs'
import { cdnUrl } from './cdn-url.mjs'

export function ogImage(path, base = '') {
  const p = new URL(path, share.origin).pathname
  const key = (p === '/git' || p.startsWith('/git/')) ? 'git' : 'home'
  return new URL(cdnUrl(config.images[key].path, base), share.origin).href}
