import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rows } from './sql-values.mjs'

test('values are quoted and escaped', () => {
  assert.equal(rows([[1, "it's", null]]), "(1,'it''s',NULL)")
})
