const root = 'https://files.qus0in.dev/v0.1.0/'

export const themeConfig = {
  nav: [
    { text: '강의 목차', link: '/index' },
    { text: 'PDF 다운로드', link: root + '01-environment.pdf' },
  ],
}

export function transformPageData(page) {
  if (/^(0[1-9]|1[0-2])-[\w-]+\.md$/.test(page.relativePath)) {
    page.frontmatter.pdf = root + page.relativePath.replace(/\.md$/, '.pdf')
  }
}
