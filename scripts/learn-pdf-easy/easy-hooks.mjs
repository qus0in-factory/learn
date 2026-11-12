import { registerHooks } from 'node:module'
import { swaps } from './easy-source-swaps.mjs'

registerHooks({ load(url, context, next) {
  const m = /\/pilot\/(contract|media|subject|assets)\.mjs$/.exec(url)
  if (!m) return next(url, context)
  const { source, format } = next(url, context)
  let text = String(source)
  for (const [from, to] of swaps[m[1]]) {
    if (!text.includes(from)) throw Error(m[1] + ': source changed')
    text = text.replaceAll(from, to)
  }
  return { format, source: text, shortCircuit: true }
} })
