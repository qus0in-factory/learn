import { test } from 'node:test'
import assert from 'node:assert/strict'
import { themeConfig, transformPageData, revision } from './.vitepress/pdf.mjs'
import { pdfUrl } from './.vitepress/pdf-url.mjs'

test('only numbered topic pages receive matching PDF data', () => {
  for (const relativePath of ['01-environment.md', '12-pull-request.md']) {
    const page = { relativePath, frontmatter: {} }
    transformPageData(page)
    assert.equal(page.frontmatter.pdf, pdfUrl(relativePath.replace('.md', '.pdf')))
  }
  for (const relativePath of ['index.md', 'appendix/01-authentication.md']) {
    const page = { relativePath, frontmatter: {} }
    transformPageData(page)
    assert.equal(page.frontmatter.pdf, undefined)
  }
  assert.equal(themeConfig.nav[1].text, 'PDF 다운로드')
  assert.equal(themeConfig.nav[1].link, pdfUrl('01-environment.pdf'))
  assert.ok(themeConfig.nav[1].link.endsWith(`?revision=${revision}`))
})
