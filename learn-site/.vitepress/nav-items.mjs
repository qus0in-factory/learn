import { readdirSync, readFileSync } from 'node:fs'
import { displayTitle } from './display-text.mjs'

const dir = new URL('../../docs/lecture/', import.meta.url)
const slug = (file) => file.replace(/\.md$/, '')
// Numbered files sort by prefix; a group with an explicit order lists only those slugs, in that order.
const files = (group) => {
  const names = readdirSync(new URL(group.directory, dir))
  if (!group.order) return names.filter(f => /^\d{2}-[\w-]+\.md$/.test(f)).sort()
  return names.filter(f => group.order.includes(slug(f))).sort((a, b) => group.order.indexOf(slug(a)) - group.order.indexOf(slug(b)))
}
export function navItems(group) {
  if (group.items) return group.items
  return files(group).map(file => {
    const text = readFileSync(new URL(group.directory + file, dir), 'utf8').match(/^# (.+)$/m)?.[1] || file
    return { text: displayTitle(text), link: `/git/${group.directory}${slug(file)}` }
  })
}
