import { transformPageData as pdfData } from './pdf.mjs'
import { site } from './site.mjs'
import { displayTitle } from './display-text.mjs'
import { labels } from './labels.mjs'
import { pageUpdated } from './page-updated.mjs'
import { stepHeaderFlag } from './step-header-flag.mjs'
import { ogPage } from './og-page.mjs'
import { seoPage } from './seo-page.mjs'
import { easy } from './easy.mjs'

export function transformPageData(page) {
  pdfData(page)
  stepHeaderFlag(page)
  pageUpdated(page)
  if (page.title) page.title = displayTitle(page.title)
  if (page.frontmatter.title) page.frontmatter.title = displayTitle(page.frontmatter.title)
  if (page.relativePath === 'git/index.md' || page.filePath === 'course-git.md') {
    page.title = labels.courseTitle
    page.frontmatter.title = labels.courseTitle
  }
  easy(page)
  if (page.relativePath === 'index.md') {
    page.title = site.title
    page.frontmatter.title = site.title
    page.frontmatter.titleTemplate = false
  }
  ogPage(page)
  seoPage(page)
}
