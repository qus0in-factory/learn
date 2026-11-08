import { execFileSync } from 'node:child_process'

const root = new URL('../../', import.meta.url)

export function runGit(args) {
  if (execFileSync('git', ['rev-parse', '--is-shallow-repository'], { cwd: root, encoding: 'utf8' }).trim() === 'true') {
    execFileSync('git', ['fetch', '--unshallow', '--filter=blob:none', 'origin'], { cwd: root, stdio: 'pipe' })
  }
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()
}

export function courseUpdated(path = 'docs/lecture') {
  const date = runGit(['log', '-1', '--format=%cs', '--', path])
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Missing course source commit')
  return date.slice(2)
}
