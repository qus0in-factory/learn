import test from 'node:test'
import assert from 'node:assert/strict'
import { buildSql } from './sql.mjs'
import { lectures, meta, quiz } from './atomic-data.mjs'
import { counts, setup, version } from './atomic-setup.mjs'
const sql = (m) => buildSql({ meta: m, lectures, quiz })

test('failed sync keeps old catalog', async () => {
  const { db, api } = setup()
  assert.deepEqual(await counts(api), [12,12,10])
  const text=sql(meta)
  db.exec(text.slice(0,text.indexOf('INSERT INTO catalog_quiz')))
  assert.deepEqual(await counts(api), [12,12,10])
  assert.equal(await version(api), 'v0.1.0')
})
test('retry is complete and idempotent', async () => {
  const { db, api } = setup()
  db.exec(sql(meta))
  assert.deepEqual([await version(api),...(await counts(api))], ['v0.2.0',12,12,10])
  db.exec(sql({...meta,syncedAt:'2026-01-02T00:00:00.000Z'}))
  assert.deepEqual([await version(api),...(await counts(api))], ['v0.2.0',12,12,10])
  assert.equal(db.prepare('SELECT count(*) n FROM catalog_versions').get().n, 1)
})
