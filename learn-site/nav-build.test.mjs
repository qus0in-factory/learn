import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { sidebar } from './.vitepress/nav.mjs'

const dist = new URL('../dist/learn/', import.meta.url)
const links = sidebar['/'].flatMap((g) => g.items).map((i) => i.link)
const read = (page) => readFileSync(new URL(page, dist), 'utf8')
const pager = (page) => [...read(page).matchAll(/class="[^"]*pager-link (prev|next)[^"]*"[^>]*href="([^"]+)"/g)].map((m) => [m[1], m[2]])

test('built pages expose sidebar links and adjacent prev/next', () => {
  const html = read('02-local-repository.html')
  for (const link of links) assert.ok(html.includes(`href="${link}.html"`), link)
  assert.deepEqual(pager('01-environment.html'), [['next', '/02-local-repository.html']])
  assert.deepEqual(pager('02-local-repository.html'), [['prev', '/01-environment.html'], ['next', '/03-commit-history.html']])
  assert.deepEqual(pager('12-pull-request.html'), [['prev', '/11-merge-conflicts.html']])
})
