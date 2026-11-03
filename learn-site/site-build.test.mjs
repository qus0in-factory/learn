import { test } from 'node:test'
import assert from 'node:assert/strict'
import { htmlFiles, read, hrefs, htmlHref } from './site-build-fixture.mjs'
import { checkLinks } from './site-link-checks.mjs'
import { checkPages, checkLanding, check404 } from './site-page-checks.mjs'

test('build emits landing, 404 and 27 course pages under /git', checkPages)
test('generated HTML has no .html href', () => {
  for (const file of htmlFiles) {
    const found = hrefs(read(file)).filter(htmlHref)
    assert.deepEqual(found, [], `${file}: ${found.join(', ')}`)
  }
})
test('internal links stay under /git and resolve to built pages', () => {
  for (const file of htmlFiles) checkLinks(file)
})
test('root is a course landing without the Git sidebar or pager', checkLanding)
test('404 page is retained and has no .html href', check404)
