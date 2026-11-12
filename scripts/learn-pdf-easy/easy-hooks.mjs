import { registerHooks } from 'node:module'
import { mediaSwaps } from './easy-media-swaps.mjs'

const root = new URL('../../', import.meta.url)
const easy = JSON.stringify(new URL('scripts/learn-pdf-easy/', root))
const pilot = JSON.stringify(new URL('scripts/learn-pdf/pilot/', root))
const swaps = {
  'contract': [['new URL(\'subjects.json\', import.meta.url)',
    `new URL('subjects.json', ${easy})`]],
  'media': mediaSwaps(root, pilot),
  'subject': [['import.meta.url', easy]],
}

registerHooks({ load(url, context, next) {
  const m = /\/pilot\/(contract|media|subject)\.mjs$/.exec(url)
  if (!m) return next(url, context)
  const { source, format } = next(url, context)
  let text = String(source)
  for (const [from, to] of swaps[m[1]]) {
    if (!text.includes(from)) throw Error(m[1] + ': source changed')
    text = text.replaceAll(from, to)
  }
  return { format, source: text, shortCircuit: true }
} })
