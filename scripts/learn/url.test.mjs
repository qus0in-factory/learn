import { test } from 'node:test'
import assert from 'node:assert/strict'
import { lectureFiles } from './paths.mjs'
import { parseLectures } from './lectures.mjs'
import { pdfUrl, revision } from '../../learn-site/.vitepress/pdf-url.mjs'
import { transformPageData } from '../../learn-site/.vitepress/pdf.mjs'
import { buildSql } from './sql.mjs'
import { courseMeta } from './meta.mjs'

test('all topic pages and D1 rows use the same revision URLs', async () => {
  const lectures = await parseLectures(await lectureFiles())
  const sql = buildSql({
    meta: courseMeta(),
    lectures,
    quiz: [{ position: 1, question: 'Q', answer: 'A', lesson: lectures[0].slug }],
  })
  for (const lecture of lectures) {
    const page = { relativePath: `lecture/${lecture.slug}.md`, frontmatter: {} }
    transformPageData(page)
    const url = pdfUrl(`${lecture.slug}.pdf`)
    assert.equal(page.frontmatter.pdf, url)
    assert.ok(url.endsWith(`?revision=${revision}`))
    assert.ok(sql.includes(url), lecture.slug)
  }
})
