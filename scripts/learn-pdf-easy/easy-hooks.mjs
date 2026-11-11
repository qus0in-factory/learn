import { registerHooks } from 'node:module'

const root = new URL('../../', import.meta.url)
const easy = JSON.stringify(new URL('scripts/learn-pdf-easy/', root))
const pilot = JSON.stringify(new URL('scripts/learn-pdf/pilot/', root))
const swaps = {
  'contract': [['new URL(\'subjects.json\', import.meta.url)',
    `new URL('subjects.json', ${easy})`]],
  'media': [['new URL(s.image, import.meta.url)',
    `(s.image.startsWith('docs/') ? new URL(s.image, ${JSON.stringify(root.href)}) : new URL(s.image, ${pilot}))`]],
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
