import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sidebar } from './.vitepress/nav.mjs'

const group = (key) => sidebar[key].flatMap((item) => item.items)
const links = ['/git/01-environment', '/git/02-local-repository', '/git/03-commit-history', '/git/04-amend-ignore', '/git/05-remote', '/git/06-pages', '/git/07-markdown-mermaid', '/git/08-profile-records', '/git/09-issues', '/git/10-branches-tags', '/git/11-merge-conflicts', '/git/12-pull-request']

test('sidebar groups 12 lectures, appendix and supplement under /git', () => {
  assert.deepEqual(group('/git/').map((item) => item.link), links)
  assert.equal(group('/git/appendix/').length, 5)
  assert.equal(group('/git/supplement/').length, 3)
  assert.ok(group('/git/appendix/').every((item) => item.link.startsWith('/git/appendix/')))
  assert.ok(group('/git/supplement/').every((item) => item.link.startsWith('/git/supplement/')))
})
