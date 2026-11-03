import { test } from 'node:test'
import assert from 'node:assert/strict'
import { themeConfig, transformPageData } from './.vitepress/pdf.mjs'

test('only numbered topic pages receive matching PDF data', () => {
  for (const relativePath of ['01-environment.md', '12-pull-request.md']) {
    const page = { relativePath, frontmatter: {} }
    transformPageData(page)
    assert.equal(page.frontmatter.pdf,
      'https://files.qus0in.dev/v0.1.0/' + relativePath.replace('.md', '.pdf'))
  }
  for (const relativePath of ['index.md', 'appendix/01-authentication.md']) {
    const page = { relativePath, frontmatter: {} }
    transformPageData(page)
    assert.equal(page.frontmatter.pdf, undefined)
  }
  assert.equal(themeConfig.nav[1].text, 'PDF 다운로드')
})
