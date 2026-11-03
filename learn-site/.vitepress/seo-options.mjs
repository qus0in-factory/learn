import { origin } from './seo-paths.mjs'
import { siteBuild } from './site-build.mjs'

export const seoOptions = {
  sitemap: { hostname: origin, transformItems: items => items.filter(item => item.url !== '404.html') },
  buildEnd: siteBuild,
}
