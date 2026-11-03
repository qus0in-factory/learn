import { test } from 'node:test'
import assert from 'node:assert/strict'
import worker from './index.js'
import { legacyRedirect } from './legacy-redirects.js'

test('legacy public addresses redirect to /git', () => {
  assert.equal(legacyRedirect('/01-environment'), '/git/01-environment')
  assert.equal(legacyRedirect('/01-environment.html'), '/git/01-environment')
  assert.equal(legacyRedirect('/catalog.html'), '/git/catalog')
  assert.equal(legacyRedirect('/index.html'), '/git/')
  assert.equal(legacyRedirect('/appendix/01-authentication'), '/git/appendix/01-authentication')
  assert.equal(legacyRedirect('/supplement/03-agent-led-git.html'), '/git/supplement/03-agent-led-git')
  assert.equal(legacyRedirect('/'), null)
  assert.equal(legacyRedirect('/git/01-environment'), null)
  assert.equal(legacyRedirect('/api/catalog'), null)
  assert.equal(legacyRedirect('/404.html'), null)
  assert.equal(legacyRedirect('/assets/app.js'), null)
})

test('worker sends 301 to the /git address and preserves the query', async () => {
  const env = { ASSETS: { fetch: () => new Response('asset') } }
  const response = await worker.fetch(new Request('https://learn.dev/01-environment.html?from=old'), env)
  assert.equal(response.status, 301)
  assert.equal(response.headers.get('location'), 'https://learn.dev/git/01-environment?from=old')
})

test('worker leaves root and /git to assets', async () => {
  const seen = []
  const env = {
    ASSETS: {
      fetch: (request) => {
        seen.push(new URL(request.url).pathname)
        return new Response('asset')
      },
    },
  }
  assert.equal((await worker.fetch(new Request('https://learn.dev/'), env)).status, 200)
  assert.equal((await worker.fetch(new Request('https://learn.dev/git/'), env)).status, 200)
  assert.deepEqual(seen, ['/', '/git/'])
})
