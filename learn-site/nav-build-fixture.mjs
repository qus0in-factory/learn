import { readFileSync } from 'node:fs'
import { courseOrder } from './.vitepress/nav.mjs'

const dist = new URL('../dist/learn/', import.meta.url)
export const links = courseOrder.map(item => item.link)
export const read = page => readFileSync(new URL(page, dist), 'utf8')
export const pager = page => [...read(page).matchAll(/class="[^"]*pager-link (prev|next)[^"]*"[^>]*href="([^"]+)"/g)]
  .map(match => [match[1], match[2]])
