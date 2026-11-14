import config from './og.json' with { type: 'json' }
import { share } from './course-share.mjs'
import { cdnUrl } from './cdn-url.mjs'
import { courseOf } from './seo-course-of.mjs'
import { courses } from './courses.mjs'
import { site } from './site.mjs'

const imageKey = p => courseOf(p).course ? 'git' : 'home'

export function ogImageMeta(path, base = '') {
  const p = new URL(path, share.origin).pathname
  const key = imageKey(p)
  return {
    url: new URL(cdnUrl(config.images[key].path, base), share.origin).href,
    alt: key === 'git' ? courses[0].image.alt : site.title,
  }
}

export function ogImage(path, base = '') {
  return ogImageMeta(path, base).url
}
