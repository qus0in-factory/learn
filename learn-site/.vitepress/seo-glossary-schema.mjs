import glossary from '../../docs/lecture/glossary.json' with { type: 'json' }
import easyGlossary from '../../docs/easy/glossary.json' with { type: 'json' }
import { absolute } from './seo-paths.mjs'

const termsByPath = {
  '/git/glossary': glossary.terms,
  '/git-easy/glossary': easyGlossary.terms,
}

export function glossaryGraph(page) {
  const terms = termsByPath[page.path]
  if (!terms) return []
  const url = absolute(page.path), id = `${url}#terms`
  return [{ '@type': 'DefinedTermSet', '@id': id, name: page.title, url },
    ...terms.map(term => ({
      '@type': 'DefinedTerm', '@id': `${url}#${term.slug}`, name: term.term,
      description: term.definition, url: `${url}#${term.slug}`,
      inDefinedTermSet: { '@id': id },
    }))]
}
