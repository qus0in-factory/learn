import { readFileSync, readdirSync, existsSync } from 'node:fs'

const dist = new URL('../dist/learn/', import.meta.url)
export const htmlFiles = readdirSync(dist, { recursive: true })
  .map(file => file.replaceAll('\\', '/')).filter(file => file.endsWith('.html'))
export const read = page => readFileSync(new URL(page, dist), 'utf8')
export const exists = page => existsSync(new URL(page, dist))
export const hrefs = html => [...html.matchAll(/href="([^"]+)"/g)].map(match => match[1])
export const pageUrl = file => `https://learn.test/${file.replace(/index\.html$/, '').replace(/\.html$/, '')}`
export const htmlHref = href => /^[^?#]*\.html(?:[?#]|$)/.test(href)
