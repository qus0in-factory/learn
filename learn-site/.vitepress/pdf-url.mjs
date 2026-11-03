import { readFileSync } from 'node:fs'
import { validateConfig } from './pdf-config.mjs'
import { checkRevision } from '../../scripts/learn-pdf/revision-check.mjs'

checkRevision()

export const pdfConfig = validateConfig(
  JSON.parse(readFileSync(new URL('./pdf.json', import.meta.url), 'utf8')),
)
export const revision = pdfConfig.revision

export function pdfUrl(file) {
  if (typeof file !== 'string' || !/^[\w-]+\.pdf$/.test(file)) {
    throw new Error(`invalid pdf file: ${file}`)
  }
  return `${pdfConfig.baseUrl}${pdfConfig.version}/${file}?revision=${pdfConfig.revision}`
}
