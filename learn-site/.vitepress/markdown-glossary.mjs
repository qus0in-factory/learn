import glossary from '../../docs/lecture/glossary.json' with { type: 'json' }
import { markdownLinks } from './markdown-links.mjs'
import { courseOrder } from './nav.mjs'

export function markdownGlossary() {
  return glossary.terms.map(term => {
    const paths = [...term.steps.map(s => `/git/${s}`),
      ...term.commands.map(s => `/git/commands/${s}`)]
    const links = paths.map(link => courseOrder.find(p => p.link === link)
      || { text: link.split('/').at(-1), link })
    return `### ${term.term} {#${term.slug}}\n\n${term.definition}\n\n${term.plain}\n\n${markdownLinks(links)}`
  }).join('\n\n')
}
