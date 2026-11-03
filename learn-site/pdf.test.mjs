import { test } from 'node:test'
import assert from 'node:assert/strict'
import { themeConfig, transformPageData } from './.vitepress/pdf.mjs'
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
  assert.deepEqual(themeConfig.nav, [])
})
