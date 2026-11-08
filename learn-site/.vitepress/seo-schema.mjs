import { absolute } from './seo-paths.mjs'
import { rootGraph } from './seo-root-schema.mjs'
import { courseGraph } from './seo-course-schema.mjs'
import { glossaryGraph } from './seo-glossary-schema.mjs'

export function schemas(p) {
  const u = absolute(p.path)
  return { '@context': 'https://schema.org', '@graph': [
    ...(p.path === '/' ? rootGraph(u, p) : courseGraph(p, u)), ...glossaryGraph(p),
  ] }
}
