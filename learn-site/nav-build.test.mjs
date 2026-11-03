import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { sidebar } from './.vitepress/nav.mjs'

const dist = new URL('../dist/learn/', import.meta.url)
const links = sidebar['/git/'].flatMap((g) => g.items).map((i) => i.link)
const read = (page) => readFileSync(new URL(page, dist), 'utf8')
const pager = (page) => [...read(page).matchAll(/class="[^"]*pager-link (prev|next)[^"]*"[^>]*href="([^"]+)"/g)].map((m) => [m[1], m[2]])

test('built pages expose clean sidebar links and adjacent prev/next under /git', () => {
  const html = read('git/02-local-repository.html')
  for (const link of links) assert.ok(html.includes(`href="${link}"`), link)
  assert.ok(!/href="[^"]*\.html/.test(html))
  assert.deepEqual(pager('git/01-environment.html'), [['next', '/git/02-local-repository']])
  assert.deepEqual(pager('git/02-local-repository.html'), [['prev', '/git/01-environment'], ['next', '/git/03-commit-history']])
  assert.deepEqual(pager('git/12-pull-request.html'), [['prev', '/git/11-merge-conflicts']])
})
