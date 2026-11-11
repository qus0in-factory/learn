import { readFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { checkArtifact, out } from './easy-artifact.mjs'
import { immutablePut } from '../learn-pdf/immutable-put.mjs'
const bucket = 'learn-files'
const { revision, pdfs } = checkArtifact()
const key = name => `${bucket}/v0.1.0/easy/revisions/${revision}/${name}.pdf`
if (process.argv.includes('--dry-run')) {
  for (const [name, sha] of Object.entries(pdfs)) console.log(key(name), sha)
} else for (const [name, sha] of Object.entries(pdfs)) {
  const k = key(name)
  immutablePut(resolve(out, name + '.pdf'), k)
  const probe = resolve(out, name + '.got')
  execFileSync('npx', ['wrangler', 'r2', 'object', 'get', k,
    '--remote', '--file', probe])
  const got = createHash('sha256').update(readFileSync(probe)).digest('hex')
  rmSync(probe)
  if (got !== sha) throw Error('readback ' + k)
  console.log(k, got, 'OK')
}
