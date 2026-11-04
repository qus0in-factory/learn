import assert from 'node:assert/strict'
import worker from './index.js'

export async function checkRedirect() {
  const env = { ASSETS: { fetch: () => new Response('asset') } }
  const response = await worker.fetch(new Request('https://learn.dev/01-environment.html?from=old'), env)
  assert.equal(response.status, 301)
  assert.equal(response.headers.get('location'), 'https://learn.dev/git/01-environment?from=old')
}
export async function checkAssets() {
  const seen = []
  const env = { ASSETS: { fetch: request => {
    seen.push(new URL(request.url).pathname)
    return new Response('asset')
  } } }
  for (const path of ['/', '/git/']) {
    assert.equal((await worker.fetch(new Request(`https://learn.dev${path}`), env)).status, 200)
  }
  assert.deepEqual(seen, ['/', '/git/'])
}
