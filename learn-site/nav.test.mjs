import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sidebar } from './.vitepress/nav.mjs'

const group = (key) => sidebar[key].flatMap((item) => item.items)
const links = ['/01-environment', '/02-local-repository', '/03-commit-history', '/04-amend-ignore', '/05-remote', '/06-pages', '/07-markdown-mermaid', '/08-profile-records', '/09-issues', '/10-branches-tags', '/11-merge-conflicts', '/12-pull-request']

test('sidebar groups 12 lectures, appendix and supplement in file order', () => {
  assert.deepEqual(group('/').map((item) => item.link), links)
  assert.equal(group('/appendix/').length, 5)
  assert.equal(group('/supplement/').length, 3)
  assert.ok(group('/appendix/').every((item) => item.link.startsWith('/appendix/')))
  assert.ok(group('/supplement/').every((item) => item.link.startsWith('/supplement/')))
})
