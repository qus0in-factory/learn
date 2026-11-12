import glossary from '../../docs/lecture/glossary.json' with { type: 'json' }
import easyGlossary from '../../docs/easy/glossary.json' with { type: 'json' }
import { markdownLinks } from './markdown-links.mjs'
import { courseOrder } from './nav.mjs'
import { easySidebar } from './easy-nav.mjs'

const flatten = items => items.flatMap(item => item.items ? flatten(item.items) : [item])
const easyOrder = flatten(easySidebar['/git-easy/'])

export function markdownGlossary(page) {
  const isEasy = page?.path?.startsWith('/git-easy')
  const data = isEasy ? easyGlossary : glossary
  const prefix = isEasy ? '/git-easy' : '/git'
  const order = isEasy ? easyOrder : courseOrder
  return data.terms.map(term => {
    const paths = [...term.steps.map(s => `${prefix}/${s}`),
      ...(term.commands || []).map(s => `${prefix}/commands/${s}`)]
    const links = paths.map(link => order.find(p => p.link === link)
      || { text: link.split('/').at(-1), link })
    return `### ${term.term} {#${term.slug}}\n\n${term.definition}\n\n${term.plain}\n\n${markdownLinks(links)}`
  }).join('\n\n')
}
