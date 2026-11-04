import { site } from './site.mjs'
import { courses } from './courses.mjs'
import { absolute } from './seo-paths.mjs'

export function schemas(page) {
  const url = absolute(page.path), name = page.title
  const course = absolute(courses[0].link)
  const list = [{ '@type': page.path === '/git/' ? 'Course' : 'LearningResource',
    name, description: page.description, url, inLanguage: 'ko-KR',
    ...(page.path === '/git/' ? { provider: { '@type': 'Organization', name: site.title, url: absolute('/') } }
      : { isPartOf: { '@type': 'Course', '@id': course, name: courses[0].title } }) }]
  const crumbs = [[site.title, '/'], ...(page.path === '/git/' ? [] : [[courses[0].title, '/git/']]), [name, page.path]]
  list.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map(([text, path], i) => ({
    '@type': 'ListItem', position: i + 1, name: text, item: absolute(path),
  })) })
  return { '@context': 'https://schema.org', '@graph': list }
}
