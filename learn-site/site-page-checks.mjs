import assert from 'node:assert/strict'
import { expectedPages } from './site-pages.mjs'
import { htmlFiles, exists, read, hrefs, htmlHref } from './site-build-fixture.mjs'

export function checkPages() {
  assert.equal(expectedPages.length, 55)
  assert.equal(expectedPages.filter(page => page.startsWith('git/') && page !== 'git/index.html').length, 50)
  for (const page of expectedPages) assert.ok(exists(page), page)
  assert.deepEqual(htmlFiles.sort(), expectedPages.sort())
}
export function checkLanding() {
  const root = read('index.html')
  for (const text of ['href="/git/"', 'Go Git 集']) assert.ok(root.includes(text))
  for (const text of ['href="/git/01-environment"', 'pager-link']) assert.ok(!root.includes(text))
}
export function check404() {
  const text = read('404.html')
  assert.ok(text.length > 0)
  assert.ok(!hrefs(text).some(htmlHref))
}
