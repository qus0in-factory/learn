import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sidebar, courseOrder } from './.vitepress/nav.mjs'

const group = () => courseOrder
const links = ['/git/01-environment', '/git/02-local-repository', '/git/03-commit-history', '/git/04-amend-ignore', '/git/05-remote', '/git/06-pages', '/git/07-markdown-mermaid', '/git/08-profile-records', '/git/09-issues', '/git/10-branches-tags', '/git/11-merge-conflicts', '/git/12-pull-request']

test('sidebar groups 12 lectures and appendices under /git', () => {
  assert.deepEqual(group('/git/').slice(0, 12).map((item) => item.link), links)
  assert.equal(sidebar['/git/'][1].items.length, 3)
  assert.deepEqual(sidebar['/git/'][1].items.map(g => g.items.length), [6, 6, 3])
  assert.ok(sidebar['/git/'][1].items.every(g => g.collapsed))
  assert.ok(sidebar['/git/'][1].collapsed)
  assert.ok(group('/git/').every(item => !item.link.includes('/supplement/')))
})
