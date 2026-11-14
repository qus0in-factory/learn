import { site } from './site.mjs'
import meta from './seo-meta.json' with { type: 'json' }
import { pageProperties } from './seo-page-properties.mjs'

export function rootGraph(url, page) {
  const description = meta.descriptions?.['/'] || site.subtitle
  return [
    { '@type': 'WebSite', name: site.title, description, url, ...pageProperties(page) },
    { '@type': 'WebPage', name: site.title, url, ...pageProperties(page) },
    { ...meta.publisher, founder: meta.author },
  ]
}
