import { transformPageData as pdfData } from './pdf.mjs'
import { site } from './site.mjs'
import { displayTitle } from './display-text.mjs'
import { labels } from './labels.mjs'
import { pageUpdated } from './page-updated.mjs'
import { ogPage } from './og-page.mjs'

export function transformPageData(page) {
  pdfData(page)
  pageUpdated(page)
  if (page.title) page.title = displayTitle(page.title)
  if (page.frontmatter.title) page.frontmatter.title = displayTitle(page.frontmatter.title)
  if (page.relativePath === 'git/index.md' || page.filePath === 'course-git.md') {
    page.title = labels.courseTitle
    page.frontmatter.title = labels.courseTitle
  }
  if (page.relativePath === 'index.md') {
    page.title = site.title
    page.frontmatter.title = site.title
    page.frontmatter.titleTemplate = false
  }
  ogPage(page)
}
