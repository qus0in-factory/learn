import { test } from 'node:test'
import assert from 'node:assert/strict'
import { legacyRedirect } from './legacy-redirects.js'
import { legacyRoutes } from './legacy-route-fixture.mjs'
import { checkRedirect, checkAssets } from './legacy-worker-fixture.mjs'

test('legacy public addresses redirect to /git', () => {
  for (const [path, target] of Object.entries(legacyRoutes)) {
    assert.equal(legacyRedirect(path), target)
  }
})
test('worker sends 301 to the /git address and preserves the query', checkRedirect)
test('worker leaves root and /git to assets', checkAssets)
