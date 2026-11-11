import { site } from './site.mjs'
import { courses } from './courses.mjs'
import { absolute } from './seo-paths.mjs'

export function breadcrumbs(page) {
  const c = courses.find(k => page.path.startsWith(k.link) && page.path !== k.link)
  const parent = c ? [[c.title, c.link]] : []
  const crumbs = [[site.title, '/'], ...parent, [page.title, page.path]]
  return { '@type': 'BreadcrumbList', itemListElement: crumbs.map(([name, path], i) => ({
    '@type': 'ListItem', position: i + 1, name, item: absolute(path),
  })) }
}
