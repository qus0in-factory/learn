import { mkdir } from 'node:fs/promises'
import { easyRevision, root } from './revision.mjs'
import './easy-hooks.mjs'
import { names } from './easy-names.mjs'
import { out } from './easy-artifact.mjs'
import { renderDeck } from './easy-render.mjs'
import { writeSeals } from './easy-seal.mjs'

const { launch } = await import('../learn-pdf/runtime.mjs')
const { renderer } = await import('../learn-pdf/bundle.mjs')
const { provenance } = await import('../learn-pdf/provenance.mjs')

await mkdir(root + '/dist/learn-pdfs', { recursive: true })
await mkdir(out, { recursive: true })
await renderer()
const browser = await launch()
provenance(browser)
const results = []
try {
  for (const name of names) results.push(await renderDeck(browser, name))
} finally { await browser.close() }
writeSeals(results)
