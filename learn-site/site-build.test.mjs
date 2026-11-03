import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'

const dist = new URL('../dist/learn/', import.meta.url)
const origin = 'https://learn.test'
const htmlFiles = readdirSync(dist, { recursive: true })
  .map((file) => file.replaceAll('\\', '/'))
  .filter((file) => file.endsWith('.html'))
const read = (page) => readFileSync(new URL(page, dist), 'utf8')
const hrefs = (html) => [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1])
const pageUrl = (file) => `${origin}/${file.replace(/index\.html$/, '').replace(/\.html$/, '')}`

const lecturePages = [
  '01-environment', '02-local-repository', '03-commit-history', '04-amend-ignore',
  '05-remote', '06-pages', '07-markdown-mermaid', '08-profile-records', '09-issues',
  '10-branches-tags', '11-merge-conflicts', '12-pull-request',
].map((page) => `git/${page}.html`)

const expectedPages = [
  'index.html',
  '404.html',
  'git/index.html',
  'git/catalog.html',
  ...lecturePages,
  ...[1, 2, 3, 4, 5].map((n) => `git/appendix/0${n}-${['authentication', 'git-options', 'web-tools', 'mermaid', 'os-differences'][n - 1]}.html`),
  ...[1, 2, 3].map((n) => `git/supplement/0${n}-${['advanced-practice', 'review-quiz', 'agent-led-git'][n - 1]}.html`),
]

test('build emits landing, 404 and 21 course pages under /git', () => {
  assert.equal(expectedPages.length, 24)
  assert.equal(expectedPages.filter((page) => page.startsWith('git/') && page !== 'git/index.html').length, 21)
  for (const page of expectedPages) assert.ok(existsSync(new URL(page, dist)), page)
  assert.deepEqual(htmlFiles.sort(), expectedPages.sort())
})

test('generated HTML has no .html href', () => {
  for (const file of htmlFiles) {
    const found = hrefs(read(file)).filter((href) => /^[^?#]*\.html(?:[?#]|$)/.test(href))
    assert.deepEqual(found, [], `${file}: ${found.join(', ')}`)
  }
})

test('internal links stay under /git and resolve to built pages', () => {
  for (const file of htmlFiles) {
    const base = pageUrl(file)
    for (const href of hrefs(read(file))) {
      if (/^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith('#')) continue
      const url = new URL(href, base)
      if (url.origin !== origin) continue
      if (url.pathname === '/vp-icons.css' || url.pathname.startsWith('/api/') || url.pathname.startsWith('/assets/')) continue
      assert.ok(url.pathname === '/' || url.pathname === '/git/' || url.pathname.startsWith('/git/'), `${file}: ${href}`)
      const target = url.pathname.endsWith('/') ? `${url.pathname.slice(1)}index.html` : `${url.pathname.slice(1)}.html`
      assert.ok(existsSync(new URL(target, dist)), `${file}: missing ${target}`)
    }
  }
})

test('root is a course landing without the Git sidebar or pager', () => {
  const root = read('index.html')
  assert.ok(root.includes('href="/git/"'))
  assert.ok(root.includes('Git과 웹 배포'))
  assert.ok(!root.includes('href="/git/01-environment"'))
  assert.ok(!root.includes('pager-link'))
})

test('404 page is retained and has no .html href', () => {
  const notFound = read('404.html')
  assert.ok(notFound.length > 0)
  assert.ok(!hrefs(notFound).some((href) => /^[^?#]*\.html(?:[?#]|$)/.test(href)))
})
