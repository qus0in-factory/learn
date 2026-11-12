import { mediaSwaps } from './easy-media-swaps.mjs'
const root = new URL('../../', import.meta.url)
const easy = JSON.stringify(new URL('scripts/learn-pdf-easy/', root))
const pilot = JSON.stringify(new URL('scripts/learn-pdf/pilot/', root))
const glossary = JSON.stringify(new URL('./easy-glossary.mjs', import.meta.url).href)
export const swaps = {
  contract: [["new URL('subjects.json', import.meta.url)", `new URL('subjects.json', ${easy})`]],
  media: mediaSwaps(root, pilot),
  subject: [['import.meta.url', easy]],
  assets: [['export async function assets(deck) {',
    `import { expandGlossary } from ${glossary};\nexport async function assets(deck) {\n  deck = expandGlossary(deck);`]],
}
