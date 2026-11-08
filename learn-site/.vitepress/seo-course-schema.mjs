import { site } from './site.mjs'
import { courses } from './courses.mjs'
import { absolute } from './seo-paths.mjs'

export function courseGraph(p, u) {
  const isGit = p.path === '/git/', c = absolute(courses[0].link)
  const item = {
    '@type': isGit ? 'Course' : 'LearningResource',
    name: p.title, description: p.description, url: u, inLanguage: 'ko-KR',
    ...(isGit ? { provider: { '@type': 'Organization', name: site.title, url: absolute('/') } }
      : { isPartOf: { '@type': 'Course', '@id': c, name: courses[0].title } }),
  }
  const crumbs = [[site.title, '/'], ...(isGit ? [] : [[courses[0].title, '/git/']]), [p.title, p.path]]
  const items = crumbs.map(([t, path], i) => ({
    '@type': 'ListItem', position: i + 1, name: t, item: absolute(path),
  }))
  return [item, { '@type': 'BreadcrumbList', itemListElement: items }]
}
