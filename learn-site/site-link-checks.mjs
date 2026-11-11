import assert from 'node:assert/strict'
import { read, hrefs, pageUrl, exists } from './site-build-fixture.mjs'

export function checkLinks(file) {
  for (const href of hrefs(read(file))) {
    if (/^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith('#')) continue
    const url = new URL(href, pageUrl(file))
    if (url.origin !== 'https://learn.test') continue
    const path = url.pathname
    if (path === '/vp-icons.css' || path.startsWith('/api/') || path.startsWith('/assets/') || /\.(svg|png|ico|webmanifest|txt|woff2)$/.test(path)) continue
    assert.ok(['/', '/licenses', '/privacy', '/git/'].includes(path) || path.startsWith('/git/') || path.startsWith('/git-easy/'), `${file}: ${href}`)
    const target = path.endsWith('/') ? `${path.slice(1)}index.html` : `${path.slice(1)}.html`
    assert.ok(exists(target), `${file}: missing ${target}`)
  }
}
