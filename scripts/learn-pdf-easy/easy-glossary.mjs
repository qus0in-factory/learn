import { readFileSync } from 'node:fs'
const data = JSON.parse(readFileSync(new URL('../../docs/easy/glossary.json', import.meta.url)))
const definitions = new Map(data.terms.map(t => [t.term, t.definition]))
export function expandGlossary(deck) {
  return deck.flatMap(slide => {
    if (slide.type !== 'glossary') return [slide]
    if (!slide.terms?.length) throw Error('Empty glossary slide')
    const rows = slide.terms.map(term => {
      const detail = definitions.get(term)
      if (!detail) throw Error(`Unknown glossary term: ${term}`)
      return { term, detail }
    })
    const pages = []
    let offset = 0
    for (let left = Math.max(1, Math.floor(rows.length / 3)); left > 0; left--) {
      const size = Math.ceil((rows.length - offset) / left)
      pages.push({ type: 'rows', title: '용어 풀이', rows: rows.slice(offset, offset + size) })
      offset += size
    }
    return pages
  })
}
