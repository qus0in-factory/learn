const root = 'https://files.qus0in.dev/v0.1.0/'
export const revision = '8dea329'
const pdfUrl = file => `${root}${file}?revision=${revision}`

export const themeConfig = {
  nav: [
    { text: '강의 목차', link: '/index' },
    { text: 'PDF 다운로드', link: pdfUrl('01-environment.pdf') },
  ],
}

export function transformPageData(page) {
  if (/^(0[1-9]|1[0-2])-[\w-]+\.md$/.test(page.relativePath)) {
    page.frontmatter.pdf = pdfUrl(page.relativePath.replace(/\.md$/, '.pdf'))
  }
}
