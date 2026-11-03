import { site } from './site.mjs'
import { courses } from './courses.mjs'
import { pagePath } from './seo-paths.mjs'

export const seoRecords = new Map()
export function recordPage(page) {
  if (!page.filePath || page.relativePath === '404.md') return
  const path = pagePath(page.relativePath)
  const record = { path, source: page.filePath, title: page.title,
    description: page.frontmatter.subtitle || (path.startsWith('/git/') ? courses[0].summary : site.subtitle),
    alt: page.frontmatter.gitStagesAlt,
    downloads: page.frontmatter.downloads, installation: page.frontmatter.installation,
    stepRefs: page.frontmatter.stepRefs }
  seoRecords.set(path, record)
  return record
}
