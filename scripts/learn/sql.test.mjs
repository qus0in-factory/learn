import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildSql } from './sql.mjs'
import { pdfUrl } from '../../learn-site/.vitepress/pdf-url.mjs'

const meta = { title: 'T', version: 'v0.1.0', syncedAt: 'fixed' }
const lectures = [{ slug: '01-environment', day: 1, position: 1, title: 'T', schedule: 'S' }]
const quiz = [{ position: 1, question: 'Q', answer: 'A', lesson: '01-environment' }]

test('sql is deterministic and refreshes every table', () => {
  const sql = buildSql({ meta, lectures, quiz })
  assert.equal(sql, buildSql({ meta, lectures, quiz }))
  assert.match(sql, /^DELETE FROM quiz_questions;/)
  for (const table of ['course_meta', 'lectures', 'pdf_assets', 'quiz_questions']) {
    assert.match(sql, new RegExp(`DELETE FROM ${table};`))
  }
})

test('sql uses the shared revision URL', () => {
  const sql = buildSql({ meta, lectures, quiz })
  assert.ok(sql.includes(pdfUrl('01-environment.pdf')))
  assert.match(sql, /\?revision=[0-9a-f]{7,40}/)
})
