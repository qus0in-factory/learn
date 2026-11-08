import { absolute } from './seo-paths.mjs'
import { rootGraph } from './seo-root-schema.mjs'
import { courseGraph } from './seo-course-schema.mjs'

export function schemas(p) {
  const u = absolute(p.path)
  return { '@context': 'https://schema.org', '@graph': p.path === '/' ? rootGraph(u) : courseGraph(p, u) }
}
