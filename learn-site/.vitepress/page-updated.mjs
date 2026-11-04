import { courseUpdated } from './updated.mjs'

const INDEX_PAGE = /^(?:git\/)?index\.md$/

// pageUpdated feeds the Step header; footerUpdated feeds the page footer.
// Index pages show neither, and pages with the Step header show the date there only.
export function pageUpdated(page) {
  if (page.frontmatter.lastUpdated === false) return
  if (!page.filePath || INDEX_PAGE.test(page.relativePath)) return
  page.frontmatter.pageUpdated = courseUpdated(`docs/${page.filePath}`)
  if (!page.frontmatter.stepHeader) page.frontmatter.footerUpdated = page.frontmatter.pageUpdated
}
