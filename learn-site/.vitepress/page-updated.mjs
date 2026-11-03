import { courseUpdated } from './updated.mjs'

const INDEX_PAGE = /^(?:git\/)?index\.md$/

export function pageUpdated(page) {
  if (!page.filePath || INDEX_PAGE.test(page.relativePath)) return
  page.frontmatter.pageUpdated = courseUpdated(`docs/${page.filePath}`)
}
