import { transformPageData as pdfData } from './pdf.mjs'
import { site } from './site.mjs'
import { displayTitle } from './display-text.mjs'

export function transformPageData(page) {
  pdfData(page)
  if (page.title) page.title = displayTitle(page.title)
  if (page.frontmatter.title) page.frontmatter.title = displayTitle(page.frontmatter.title)
  if (page.relativePath === 'index.md') {
    page.title = site.title
    page.frontmatter.title = site.title
    page.frontmatter.titleTemplate = false
  }
}
