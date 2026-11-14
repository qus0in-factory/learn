import { site } from './site.mjs'
import { pagePath } from './seo-paths.mjs'
import { courseOf } from './seo-course-of.mjs'
import { pageFirstmod, pageLastmod } from './sitemap-lastmod.mjs'
import meta from './seo-meta.json' with { type: 'json' }

export function describe(page, path) {
  if (page.frontmatter.description) return page.frontmatter.description
  if (meta.descriptions[path]) return meta.descriptions[path]
  const { course, isCourseIndex, isLesson } = courseOf(path)
  const sub = page.frontmatter.subtitle
  const usable = sub && sub !== course?.summary ? sub : ''
  if (isLesson && course?.id === 'git-easy')
    return `${page.title} — ${course.title}. ${usable || course.summary}`
  if (usable) return usable
  if (isCourseIndex && course) return course.summary
  if (isLesson && course) return `${page.title} — ${course.title}. ${course.summary}`
  return site.subtitle
}

export const seoRecords = new Map()
export function recordPage(page) {
  if (!page.filePath || page.relativePath === '404.md') return
  const path = pagePath(page.relativePath)
  const url = path.slice(1)
  const record = { path, source: page.filePath, title: page.title,
    description: describe(page, path),
    updated: pageLastmod(url), published: pageFirstmod(url), tags: page.frontmatter.tags || [],
    downloads: page.frontmatter.downloads, installation: page.frontmatter.installation,
    stepRefs: page.frontmatter.stepRefs }
  seoRecords.set(path, record)
  return record
}
