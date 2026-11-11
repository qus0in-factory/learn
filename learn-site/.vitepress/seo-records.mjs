import { site } from './site.mjs'
import { courses } from './courses.mjs'
import { pagePath } from './seo-paths.mjs'
import { pageLastmod } from './sitemap-lastmod.mjs'
import meta from './seo-meta.json' with { type: 'json' }

export const seoRecords = new Map()
export function recordPage(page) {
  if (!page.filePath || page.relativePath === '404.md') return
  const path = pagePath(page.relativePath)
  const record = { path, source: page.filePath, title: page.title,
    description: page.frontmatter.subtitle || meta.descriptions[path] || (path.startsWith('/git/') && !path.startsWith('/git-easy/') ? courses[0].summary : site.subtitle),
    updated: pageLastmod(path.slice(1)), tags: page.frontmatter.tags || [],
    downloads: page.frontmatter.downloads, installation: page.frontmatter.installation,
    stepRefs: page.frontmatter.stepRefs }
  seoRecords.set(path, record)
  return record
}
