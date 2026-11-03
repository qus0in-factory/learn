import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildSql } from './sql.mjs'
const meta = { title: 'T', version: 'v0.1.0', syncedAt: 'fixed' }
const lectures = [{ slug: '01-environment', day: 1, position: 1, title: 'T', schedule: 'S' }]
const quiz = [{ position: 1, question: 'Q', answer: 'A', lesson: '01-environment', lessons: ['01-environment'] }]

test('links every quiz lesson into quiz_links', () => {
  const sql = buildSql({ meta, lectures, quiz })
  assert.match(sql, /DELETE FROM quiz_links/)
  assert.match(sql, /INSERT INTO quiz_links/)
  assert.ok(sql.includes(",1,0,'01-environment')"))
})

test('rejects a quiz without lessons', () => {
  const empty = [{ ...quiz[0], lesson: null, lessons: [] }]
  assert.throws(() => buildSql({ meta, lectures, quiz: empty }), /quiz without lesson/)
})
