import { readDeck } from './easy-deck.mjs'
import { stepName } from './easy-names.mjs'
import { out } from './easy-artifact.mjs'
const { deckPage } = await import('../learn-pdf/pilot/page.mjs')
const { audit } = await import('../learn-pdf/pilot/audit.mjs')
export async function renderDeck(browser, name) {
  const deck = new URL('decks/' + stepName(name) + '.json', import.meta.url)
  const info = readDeck(deck)
  const { page } = await deckPage(browser, deck)
  try {
    await page.evaluate(t => { document.title = t }, info[0].step + ' ' + info[0].title)
    const fonts = await audit(page)
    await page.pdf({ path: `${out}/${name}.pdf`, preferCSSPageSize: true, printBackground: true })
    console.log(name, info.length, fonts)
    return { name, title: info[0].step + ' ' + info[0].title, pages: info.length,
      samples: [...new Set([1, 4, Math.ceil(info.length / 2), info.length])], fonts }
  } finally { await page.close() }
}
