import { absolute } from './seo-paths.mjs'
import { pageProperties } from './seo-page-properties.mjs'
import { courseParts } from './seo-course-parts.mjs'
import { breadcrumbs } from './seo-breadcrumbs.mjs'
import meta from './seo-meta.json' with { type: 'json' }

export function courseGraph(p, url) {
  const course = p.path === '/git/'
  const lesson = /^\/git\/(\d|appendix\/|commands\/)/.test(p.path)
  const item = {
    '@type': course ? 'Course' : lesson ? 'LearningResource' : 'WebPage',
    name: p.title, description: p.description, url, inLanguage: 'ko-KR',
    ...pageProperties(p), ...courseParts(p),
    ...(course ? { provider: meta.publisher } : lesson
      ? { isPartOf: { '@type': 'Course', '@id': absolute('/git/') } } : {}),
  }
  return [item, breadcrumbs(p)]
}
