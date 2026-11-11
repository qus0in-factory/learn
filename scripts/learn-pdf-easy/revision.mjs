import { createHash } from 'node:crypto'
import { readdirSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')

// sha1 over docs/easy + scripts/learn-pdf-easy only; independent of the frozen
// pdf.json revision. Walk order and rules mirror pilot/source-revision.mjs.
export function easyRevision() {
  const hash = createHash('sha1')
  const walk = dir => {
    for (const entry of readdirSync(resolve(root, dir), { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      if (['node_modules', '__pycache__'].includes(entry.name)) continue
      const path = `${dir}/${entry.name}`
      if (entry.isDirectory()) walk(path)
      else hash.update(path + '\0').update(readFileSync(resolve(root, path))).update('\0')
    }
  }
  walk('docs/easy')
  walk('scripts/learn-pdf-easy')
  return hash.digest('hex')
}
