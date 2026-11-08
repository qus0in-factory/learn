import { site } from './site.mjs'
import { courses } from './courses.mjs'
import { absolute } from './seo-paths.mjs'

export function breadcrumbs(page) {
  const parent = page.path.startsWith('/git/') && page.path !== '/git/'
    ? [[courses[0].title, '/git/']] : []
  const crumbs = [[site.title, '/'], ...parent, [page.title, page.path]]
  return { '@type': 'BreadcrumbList', itemListElement: crumbs.map(([name, path], i) => ({
    '@type': 'ListItem', position: i + 1, name, item: absolute(path),
  })) }
}
