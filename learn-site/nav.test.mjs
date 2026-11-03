import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sidebar } from './.vitepress/nav.mjs'

const group = (key) => sidebar[key].flatMap((item) => item.items)
const links = ['/git/01-environment', '/git/02-local-repository', '/git/03-commit-history', '/git/04-amend-ignore', '/git/05-remote', '/git/06-pages', '/git/07-markdown-mermaid', '/git/08-profile-records', '/git/09-issues', '/git/10-branches-tags', '/git/11-merge-conflicts', '/git/12-pull-request']

test('sidebar groups 12 lectures, appendix and supplement under /git', () => {
  assert.deepEqual(group('/git/').slice(0, 12).map((item) => item.link), links)
  assert.equal(sidebar['/git/'][1].items.length, 3)
  assert.equal(sidebar['/git/'][2].items.length, 6)
  assert.ok(sidebar['/git/'][1].collapsed && sidebar['/git/'][2].collapsed)
  assert.ok(sidebar['/git/'][1].items.every(item => item.link.startsWith('/git/supplement/')))
})
