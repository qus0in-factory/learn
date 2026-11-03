import { sidebar } from './nav.mjs'
import { pdfUrl, revision } from './pdf-url.mjs'

export { revision }

export const themeConfig = {
  nav: [
    { text: '강의 목차', link: '/index' },
    { text: 'PDF 다운로드', link: pdfUrl('01-environment.pdf') },
  ],
  sidebar,
}

export function transformPageData(page) {
  if (/^(0[1-9]|1[0-2])-[\w-]+\.md$/.test(page.relativePath)) {
    page.frontmatter.pdf = pdfUrl(page.relativePath.replace(/\.md$/, '.pdf'))
  }
}
