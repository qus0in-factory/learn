import glossary from '../../docs/lecture/glossary.json' with { type: 'json' }
import { absolute } from './seo-paths.mjs'

export function glossaryGraph(page) {
  if (page.path !== '/git/glossary') return []
  const url = absolute(page.path), id = `${url}#terms`
  return [{ '@type': 'DefinedTermSet', '@id': id, name: page.title, url },
    ...glossary.terms.map(term => ({
      '@type': 'DefinedTerm', '@id': `${url}#${term.slug}`, name: term.term,
      description: term.definition, url: `${url}#${term.slug}`,
      inDefinedTermSet: { '@id': id },
    }))]
}
