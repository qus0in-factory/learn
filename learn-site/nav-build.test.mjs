import { test } from 'node:test'
import assert from 'node:assert/strict'
import { links, read, pager } from './nav-build-fixture.mjs'

test('built pages expose clean sidebar links and adjacent prev/next under /git', () => {
  const html = read('git/02-local-repository.html')
  for (const link of links) assert.ok(html.includes(`href="${link}"`), link)
  assert.ok(!/href="[^"]*\.html/.test(html))
  assert.deepEqual(pager('git/01-environment.html'), [['next', '/git/02-local-repository']])
  assert.deepEqual(pager('git/02-local-repository.html'), [['prev', '/git/01-environment'], ['next', '/git/03-commit-history']])
  assert.deepEqual(pager('git/12-pull-request.html'), [['prev', '/git/11-merge-conflicts'], ['next', '/git/supplement/01-advanced-practice']])
})
