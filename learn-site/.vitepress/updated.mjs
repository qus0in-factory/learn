import { execFileSync } from 'node:child_process'

export function courseUpdated() {
  const root = new URL('../../', import.meta.url)
  const git = (args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()
  if (git(['rev-parse', '--is-shallow-repository']) === 'true') {
    execFileSync('git', ['fetch', '--unshallow', '--filter=blob:none', 'origin'], {
      cwd: root, stdio: 'pipe',
    })
  }
  const date = git([
    'log', '-1', '--format=%cs', '--', 'docs/lecture',
  ])
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Missing course source commit')
  return date.slice(2)
}
