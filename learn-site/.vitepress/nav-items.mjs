import { readdirSync, readFileSync } from 'node:fs'
import { displayTitle } from './display-text.mjs'

const dir = new URL('../../docs/lecture/', import.meta.url)
export function navItems(group) {
  return readdirSync(new URL(group.directory, dir)).filter(f => /^\d{2}-[\w-]+\.md$/.test(f)).sort().map(file => {
    const text = readFileSync(new URL(group.directory + file, dir), 'utf8').match(/^# (.+)$/m)?.[1] || file
    return { text: displayTitle(text),
      link: `/git/${group.directory}${file.replace(/\.md$/, '')}` }
  })
}
