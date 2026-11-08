import { runGit } from './updated.mjs'
import { pages } from './pages.mjs'

let cache
export function gitCommitDates() {
  if (cache) return cache
  const out = runGit(['log', '--name-only', '--format=COMMIT:%cI'])
  const map = new Map()
  let cur = ''
  for (const l of out.split('\n')) {
    if (l.startsWith('COMMIT:')) cur = l.slice(7)
    else if (l.trim() && !map.has(l.trim())) map.set(l.trim(), cur)
  }
  return (cache = map)
}

const p = Object.entries(pages)
const rev = Object.fromEntries(p.filter(([, d]) => !d.endsWith(':page')).map(([s, d]) => [d, s]))
const pfx = p.filter(([, d]) => d.endsWith(':page')).map(([s, d]) => [d.slice(0, -5), s.slice(0, -5)])

export function urlToDoc(url) {
  const r = url.replace(/(^|\/)$/, '$1index').replace(/(\.html)?$/, '.md')
  if (rev[r]) return `docs/${rev[r]}`
  for (const [d, s] of pfx) if (r.startsWith(d)) return `docs/${s}${r.slice(d.length)}`
  return `docs/${r}`
}

export function pageLastmod(url) {
  return gitCommitDates().get(urlToDoc(url))
}
