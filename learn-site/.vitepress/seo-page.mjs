import { recordPage } from './seo-records.mjs'
import { absolute, markdownPath } from './seo-paths.mjs'
import { schemas } from './seo-schema.mjs'

export function seoPage(page) {
  const record = recordPage(page)
  if (!record) return
  page.description = record.description
  const head = [
    ['link', { rel: 'canonical', href: absolute(record.path) }],
    ['link', { rel: 'alternate', type: 'text/markdown', href: absolute(markdownPath(record.path)) }],
  ]
  if (record.path.startsWith('/git/')) {
    head.push(['script', { type: 'application/ld+json' }, JSON.stringify(schemas(record)).replace(/</g, '\\u003c')])
  }
  page.frontmatter.head = [...(page.frontmatter.head || []), ...head]
}
