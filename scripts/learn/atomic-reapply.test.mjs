import test from 'node:test'
import assert from 'node:assert/strict'
import { buildSql } from './sql.mjs'
import { lectures, meta, quiz } from './atomic-data.mjs'
import { counts, setup, version } from './atomic-setup.mjs'
const sql = buildSql({ meta, lectures, quiz })

test('re-applying the same SQL file is a safe no-op', async () => {
  const { db, api } = setup()
  db.exec(sql)
  db.exec(sql)
  assert.deepEqual([await version(api), ...(await counts(api))], ['v0.2.0', 12, 12, 10])
  assert.equal(db.prepare('SELECT count(*) n FROM catalog_versions').get().n, 1)
  assert.equal(db.prepare('SELECT count(*) n FROM quiz_links').get().n, 10)
  assert.equal(db.prepare('SELECT catalog_version FROM catalog_pointer').get().catalog_version, 'sync-2026-01-01T00:00:00.000Z')
})
