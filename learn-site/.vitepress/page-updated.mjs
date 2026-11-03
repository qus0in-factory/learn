import { courseUpdated } from './updated.mjs'

const INDEX_PAGE = /^(?:git\/)?index\.md$/

// pageUpdated feeds the Step header; footerUpdated feeds the page footer.
// Index pages show neither, and Step pages show the date in the header only.
export function pageUpdated(page) {
  if (!page.filePath || INDEX_PAGE.test(page.relativePath)) return
  page.frontmatter.pageUpdated = courseUpdated(`docs/${page.filePath}`)
  if (!page.frontmatter.pdf) page.frontmatter.footerUpdated = page.frontmatter.pageUpdated
}
