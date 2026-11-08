import { origin } from './seo-paths.mjs'
import { siteBuild } from './site-build.mjs'
import { pageLastmod } from './sitemap-lastmod.mjs'

export const seoOptions = {
  sitemap: {
    hostname: origin,
    transformItems: items => items
      .filter(item => item.url !== '404.html')
      .map(item => {
        const lastmod = pageLastmod(item.url)
        return lastmod ? { ...item, lastmod } : item
      }),
  },
  buildEnd: siteBuild,
}
