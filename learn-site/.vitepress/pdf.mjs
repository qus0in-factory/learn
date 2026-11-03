import { sidebar } from './nav.mjs'
import { site } from './site.mjs'
import { pdfUrl, revision } from './pdf-url.mjs'

export { revision }

export const themeConfig = {
  logo: site.logo,
  nav: [],
  sidebar,
}

export function transformPageData(page) {
  if (/^(?:lecture|git)\/(0[1-9]|1[0-2])-[\w-]+\.md$/.test(page.relativePath)) {
    page.frontmatter.pdf = pdfUrl(page.relativePath.split('/').at(-1).replace(/\.md$/, '.pdf'))
  }
}
