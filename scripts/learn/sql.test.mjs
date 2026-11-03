import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildSql } from './sql.mjs'
import { pdfUrl } from '../../learn-site/.vitepress/pdf-url.mjs'
const meta = { title: 'T', version: 'v0.1.0', syncedAt: 'fixed' }
const lectures = [{ slug: '01-environment', day: 1, position: 1, title: 'T', schedule: 'S' }]
const quiz = [{ position: 1, question: 'Q', answer: 'A', lesson: '01-environment' }]

test('sql switches the pointer after writing', () => {
  const sql=buildSql({meta,lectures,quiz})
  assert.equal(sql, buildSql({meta,lectures,quiz}))
  assert.ok(sql.indexOf('INSERT INTO catalog_pointer')>sql.indexOf('INSERT INTO catalog_quiz'))
  for (const t of ['catalog_quiz','catalog_pdfs','catalog_lectures','catalog_versions']) {
    assert.match(sql, new RegExp(`DELETE FROM ${t}`))
  }
})
test('sql uses shared revision URL', () => {
  const sql=buildSql({meta,lectures,quiz})
  assert.ok(sql.includes(pdfUrl('01-environment.pdf')))
  assert.match(sql, /\?revision=[0-9a-f]{7,40}/)
})
