import { readFileSync } from 'node:fs'
import { pdfConfig } from './pdf-url.mjs'
import { validateConfig } from './pdf-config.mjs'
import { names } from '../../scripts/learn-pdf-easy/easy-names.mjs'
import { easyPages } from '../easy-pages.mjs'

const { revision, prefix } = JSON.parse(readFileSync(new URL('./pdf-easy.json', import.meta.url)))
validateConfig({ baseUrl: pdfConfig.baseUrl, version: pdfConfig.version, revision })

export { revision }

export function easyPdfUrl(file) {
  const f = file.endsWith('.pdf') ? file : `${file}.pdf`
  return `${pdfConfig.baseUrl}${pdfConfig.version}/${prefix}${f}?revision=${revision}`
}

export const easyLessons = Object.fromEntries(
  easyPages.slice(1).map((p, i) => [p.replace('.html', ''), easyPdfUrl(names[i])]),
)
