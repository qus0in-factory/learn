import { sidebar } from './nav.mjs'
import { courses } from './courses.mjs'
import { pdfUrl, revision } from './pdf-url.mjs'

export { revision }

export const themeConfig = {
  nav: [
    { text: '과정 목록', link: '/' },
    ...courses.map((course) => ({ text: course.navTitle, link: course.link })),
    { text: 'PDF 다운로드', link: pdfUrl('01-environment.pdf') },
  ],
  sidebar,
}

export function transformPageData(page) {
  if (/^(?:lecture|git)\/(0[1-9]|1[0-2])-[\w-]+\.md$/.test(page.relativePath)) {
    page.frontmatter.pdf = pdfUrl(page.relativePath.split('/').at(-1).replace(/\.md$/, '.pdf'))
  }
}
