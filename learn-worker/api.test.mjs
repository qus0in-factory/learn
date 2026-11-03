import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handleApi } from './api.js'
import { db } from './test-db.js'

const request = (path, method = 'GET') => new Request('https://learn.dev' + path, { method })

test('serves catalog json', async () => {
  const res = await handleApi(request('/api/catalog'), { DB: db })
  assert.equal(res.status, 200)
  assert.equal(res.headers.get('cache-control'), 'public, max-age=60')
  const body = await res.json()
  assert.equal(body.version, 'v0.1.0')
  assert.equal(body.lectures[0].slug, '01-environment')
})

test('rejects unknown routes/methods', async () => {
  assert.equal((await handleApi(request('/api/other'), { DB: db })).status, 404)
  assert.equal((await handleApi(request('/api/catalog', 'POST'), { DB: db })).status, 405)
})

test('returns 503 when empty', async () => {
  const empty = { prepare: () => ({ all: async () => ({ results: [] }) }) }
  assert.equal((await handleApi(request('/api/catalog'), { DB: empty })).status, 503)
})
