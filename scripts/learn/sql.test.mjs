import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rows } from './sql-values.mjs'
import { buildSql } from './sql.mjs'

test('values are quoted and escaped', () => {
  assert.equal(rows([[1, "it's", null]]), "(1,'it''s',NULL)")
})

test('sql is deterministic and refreshes every table', () => {
  const meta = { title: 'T', version: 'v0.1.0', root: 'https://files.qus0in.dev/v0.1.0/', syncedAt: 'fixed' }
  const lectures = [{ slug: '01-environment', day: 1, position: 1, title: 'T', schedule: 'S' }]
  const quiz = [{ position: 1, question: 'Q', answer: 'A', lesson: '01-environment' }]
  const sql = buildSql({ meta, lectures, quiz })
  assert.equal(sql, buildSql({ meta, lectures, quiz }))
  assert.match(sql, /^DELETE FROM quiz_questions;/)
  for (const table of ['course_meta', 'lectures', 'pdf_assets', 'quiz_questions']) {
    assert.match(sql, new RegExp(`DELETE FROM ${table};`))
  }
  assert.match(sql, /v0\.1\.0\/01-environment\.pdf/)
})
