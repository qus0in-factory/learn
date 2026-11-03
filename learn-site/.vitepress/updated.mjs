import { execFileSync } from 'node:child_process'

export function courseUpdated() {
  const root = new URL('../../', import.meta.url)
  const date = execFileSync('git', [
    'log', '-1', '--format=%cs', '--', 'docs/lecture',
  ], { cwd: root, encoding: 'utf8' }).trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Missing course source commit')
  return date.slice(2)
}
