import { transformPageData as pdfData } from './pdf.mjs'
import { site } from './site.mjs'
import { displayTitle } from './display-text.mjs'
import { labels } from './labels.mjs'
import { courseUpdated } from './updated.mjs'

export function transformPageData(page) {
  pdfData(page)
  if (page.frontmatter.pdf) {
    const name = page.relativePath.split('/').at(-1)
    page.frontmatter.stepUpdated = courseUpdated(`docs/lecture/${name}`)
  }
  if (page.title) page.title = displayTitle(page.title)
  const appendix = page.relativePath.match(/^(?:lecture|git)\/appendix\/(\d{2})-/)
  if (appendix) page.title = `${labels.appendix} ${Number(appendix[1])}. ${page.title}`
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
}
