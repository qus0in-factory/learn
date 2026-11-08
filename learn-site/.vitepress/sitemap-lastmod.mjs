import { execFileSync } from 'node:child_process'

let cached

export function gitCommitDates() {
  if (cached) return cached
  const root = new URL('../../', import.meta.url)
  const out = execFileSync('git', ['log', '--name-only', '--format=COMMIT:%cI'], {
    cwd: root, encoding: 'utf8',
  })
  const map = new Map()
  let current = ''
  for (const line of out.split('\n')) {
    if (line.startsWith('COMMIT:')) current = line.slice(7)
    else if (line.trim()) {
      const f = line.trim()
      if (!map.has(f)) map.set(f, current)
    }
  }
  return (cached = map)
}

export function pageLastmod(url) {
  const map = gitCommitDates()
  const c = url.replace(/^\//, '').replace(/\/$/, '')
  const list = [
    c === '' ? 'docs/index.md' : null,
    c === 'git' ? 'docs/course-git.md' : null,
    c.startsWith('git/') ? `docs/lecture/${c.slice(4)}.md` : null,
    `docs/${c}.md`,
  ].filter(Boolean)
  for (const f of list) if (map.has(f)) return map.get(f)
}
