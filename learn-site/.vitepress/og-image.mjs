import config from './og.json' with { type: 'json' }
import { share } from './course-share.mjs'
import { cdnUrl } from './cdn-url.mjs'

export function ogImage(path, base = '') {
  const key = new URL(path, share.origin).pathname.startsWith('/git') ? 'git' : 'home'
  return new URL(cdnUrl(config.images[key].path, base), share.origin).href
}
