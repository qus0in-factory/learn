import { transformPageData as pdfData } from './pdf.mjs'
import { site } from './site.mjs'

export function transformPageData(page) {
  pdfData(page)
  if (page.relativePath === 'index.md') {
    page.title = site.title
    page.frontmatter.title = site.title
    page.frontmatter.titleTemplate = false
  }
}
