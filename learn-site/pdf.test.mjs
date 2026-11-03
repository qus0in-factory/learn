import { test } from 'node:test'
import assert from 'node:assert/strict'
import { themeConfig, transformPageData, revision } from './.vitepress/pdf.mjs'
import { pdfUrl } from './.vitepress/pdf-url.mjs'

test('only numbered lecture pages receive matching PDF data', () => {
  for (const relativePath of ['lecture/01-environment.md', 'lecture/12-pull-request.md']) {
    const page = { relativePath, frontmatter: {} }
    transformPageData(page)
    assert.equal(page.frontmatter.pdf, pdfUrl(relativePath.replace('lecture/', '').replace('.md', '.pdf')))
  }
  for (const relativePath of ['lecture/index.md', 'lecture/appendix/01-authentication.md', 'index.md']) {
    const page = { relativePath, frontmatter: {} }
    transformPageData(page)
    assert.equal(page.frontmatter.pdf, undefined)
  }
  assert.equal(themeConfig.nav[0].link, '/')
  assert.equal(themeConfig.nav[1].link, '/git/')
  assert.equal(themeConfig.nav[2].text, 'PDF 다운로드')
  assert.equal(themeConfig.nav[2].link, pdfUrl('01-environment.pdf'))
  assert.ok(themeConfig.nav[2].link.endsWith(`?revision=${revision}`))
})
