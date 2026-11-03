import test from 'node:test'
import assert from 'node:assert/strict'
import { loadCatalog } from './catalog.js'
import { db } from './test-db.js'

test('catalog exposes the representative lesson and all linked lessons', async () => {
  const catalog = await loadCatalog(db)
  assert.equal(catalog.quiz[0].lesson, '01-environment')
  assert.deepEqual(catalog.quiz[0].lessons, ['01-environment'])
})
