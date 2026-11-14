import { site } from './site.mjs'
import config from './og.json' with { type: 'json' }
import { ogImageMeta } from './og-image.mjs'
import { ogHead } from './og-head.mjs'
import { absolute, pagePath } from './seo-paths.mjs'
import { courseOf } from './seo-course-of.mjs'
import { describe } from './seo-records.mjs'
import { pageFirstmod, pageLastmod } from './sitemap-lastmod.mjs'

const iso = value => {
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toISOString()
}

export function ogPage(page) {
  const path = pagePath(page.relativePath)
  const { isLesson } = courseOf(path)
  const description = describe(page, path)
  const url = path.slice(1)
  const image = ogImageMeta(path, process.env.VITE_ASSET_CDN_BASE_URL)
  const values = {
    title: page.title || site.title, description, url: absolute(path),
    image: image.url,
    type: isLesson ? config.stepType : config.siteType,
    locale: config.locale, site_name: site.title,
    'image:width': config.width, 'image:height': config.height,
    'image:alt': image.alt,
  }
  const article = isLesson ? {
    published_time: iso(pageFirstmod(url)), modified_time: iso(pageLastmod(url)),
  } : null
  page.frontmatter.head = [...(page.frontmatter.head || []), ...ogHead(values, article)]
}
