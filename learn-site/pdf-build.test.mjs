import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { lectureFiles } from '../scripts/learn/paths.mjs'
import { pdfUrl } from './.vitepress/pdf-url.mjs'

test('every built course page has its own revision PDF link', async () => {
  for (const file of await lectureFiles()) {
    const slug = file.replace('.md', '')
    const html = readFileSync(new URL(`../dist/learn/git/${slug}.html`, import.meta.url), 'utf8')
    assert.ok(html.includes(`href="${pdfUrl(`${slug}.pdf`)}"`), slug)
    assert.ok(html.includes('이 주제 PDF 다운로드'), slug)
  }
})
