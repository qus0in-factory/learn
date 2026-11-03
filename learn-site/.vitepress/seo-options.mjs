import { origin } from './seo-paths.mjs'
import { seoBuild } from './seo-build.mjs'

export const seoOptions = {
  sitemap: { hostname: origin, transformItems: items => items.filter(item => item.url !== '404.html') },
  buildEnd: seoBuild,
}
