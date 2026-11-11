import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { easyRevision, root } from './revision.mjs'
export const out = root + '/dist/learn-pdfs-easy'
export function checkArtifact() {
  const saved = JSON.parse(readFileSync(out + '/artifact.json'))
  const revision = easyRevision()
  if (saved.revision !== revision || Object.keys(saved.pdfs).length !== 12)
    throw Error('artifact/revision mismatch; rebuild required')
  for (const [name, sha] of Object.entries(saved.pdfs)) {
    const bytes = readFileSync(`${out}/${name}.pdf`)
    if (bytes.subarray(0, 5).toString() !== '%PDF-') throw Error('bad PDF: ' + name)
    if (createHash('sha256').update(bytes).digest('hex') !== sha)
      throw Error('SHA mismatch: ' + name)
  }
  const cfg = JSON.parse(readFileSync(root + '/learn-site/.vitepress/pdf-easy.json'))
  if (cfg.revision !== revision) throw Error('pdf-easy.json revision mismatch')
  return { revision, pdfs: saved.pdfs }
}
