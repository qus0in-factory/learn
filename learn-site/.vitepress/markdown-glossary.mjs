import glossary from '../../docs/lecture/glossary.json' with { type: 'json' }
import easyGlossary from '../../docs/easy/glossary.json' with { type: 'json' }
import { markdownLinks } from './markdown-links.mjs'
import { courseOrder } from './nav.mjs'
import { easySidebar } from './easy-nav.mjs'
import { courseOf, coursePrefix, flattenCourseItems } from './seo-course-of.mjs'

const easyOrder = flattenCourseItems(easySidebar['/git-easy/'])

export function markdownGlossary(page) {
  const isEasy = courseOf(page?.path).course?.id === 'git-easy'
  const data = isEasy ? easyGlossary : glossary
  const prefix = coursePrefix(page?.path)
  const order = isEasy ? easyOrder : courseOrder
  return data.terms.map(term => {
    const paths = [...term.steps.map(s => `${prefix}/${s}`),
      ...(term.commands || []).map(s => `${prefix}/commands/${s}`)]
    const links = paths.map(link => order.find(p => p.link === link)
      || { text: link.split('/').at(-1), link })
    return `### ${term.term} {#${term.slug}}\n\n${term.definition}\n\n${term.plain}\n\n${markdownLinks(links)}`
  }).join('\n\n')
}
