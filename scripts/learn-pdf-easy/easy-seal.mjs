import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { easyRevision, root } from './revision.mjs'
import { out } from './easy-artifact.mjs'
export function writeSeals(results) {
  const revision = easyRevision()
  writeFileSync(out + '/manifest.json', JSON.stringify(results, null, 2))
  const pdfs = Object.fromEntries(results.map(({ name }) => [name,
    createHash('sha256').update(readFileSync(`${out}/${name}.pdf`)).digest('hex')]))
  writeFileSync(out + '/artifact.json', JSON.stringify({ revision, pdfs }, null, 2))
  writeFileSync(root + '/learn-site/.vitepress/pdf-easy.json',
    JSON.stringify({ revision, prefix: 'easy/' }, null, 2) + '\n')
  return { revision, pdfs, key: name => `v0.1.0/easy/revisions/${revision}/${name}.pdf` }
}
