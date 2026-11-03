import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildSql } from './sql.mjs'

const meta = { title: 'T', version: 'v0.1.0', syncedAt: 'fixed' }
const lectures = [{ slug: '01-environment', day: 1, position: 1, title: 'T', schedule: 'S' }]
const quiz = [{ position: 1, question: 'Q', answer: 'A', lesson: '01-environment' }]

test('sql rejects empty inputs', () => {
  assert.throws(() => buildSql({ meta, lectures: [], quiz }), /no lectures/)
  assert.throws(() => buildSql({ meta, lectures, quiz: [] }), /no quiz questions/)
})
