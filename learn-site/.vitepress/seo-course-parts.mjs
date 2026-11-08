import { courseOrder } from './nav.mjs'
import { absolute } from './seo-paths.mjs'

export function courseParts(page) {
  if (page.path !== '/git/') return page.tags.length ? { keywords: page.tags, teaches: page.tags } : {}
  const steps = courseOrder.filter(item => /^\/git\/\d/.test(item.link))
  return {
    about: steps.map(item => item.text), teaches: steps.map(item => item.text),
    hasPart: steps.map(item => ({ '@type': 'LearningResource', name: item.text, url: absolute(item.link) })),
  }
}
