import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { themeConfig } from './.vitepress/pdf.mjs'
import { names as n } from '../scripts/learn-pdf-easy/easy-names.mjs'
import { easyPages as ep } from './easy-pages.mjs'

const j = f => JSON.parse(readFileSync(new URL(f, import.meta.url)))
const e = j('./.vitepress/pdf-easy.json'), p = j('./.vitepress/pdf.json')

test('easyLessons maps 12 paths to easy PDF URLs without git links', () => {
  const { easyLessons: el } = themeConfig, keys = Object.keys(el)
  assert.equal(keys.length, 12)
  assert.ok(keys.every(k => k.startsWith('git-easy/') && !k.includes('/git/')))
  assert.deepEqual(keys, ep.slice(1).map(x => x.replace('.html', '')))
  keys.forEach((k, i) => {
    const url = `${p.baseUrl}${p.version}/easy/${n[i]}.pdf?revision=${e.revision}`
    assert.equal(el[k], url)
    assert.equal(n[i].slice(0, 2), String(i + 1).padStart(2, '0'))
  })
})
