import { site } from './site.mjs'

export function rootGraph(url) {
  return [
    { '@type': 'WebSite', name: site.title, description: site.subtitle, url },
    { '@type': 'Organization', name: site.title, url },
  ]
}
