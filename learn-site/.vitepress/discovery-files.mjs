import { absolute, markdownPath } from './seo-paths.mjs'
import { site } from './site.mjs'
import { discoveryIndex } from './discovery-index.mjs'

export function discoveryFiles(records, bodies) {
  return {
    'robots.txt': `User-agent: *\nAllow: /\nSitemap: ${absolute('/sitemap.xml')}\n`,
    'llms.txt': `# ${site.title}\n\n> ${site.subtitle}\n\n${discoveryIndex(records)}`,
    'llms-full.txt': bodies.join('\n\n---\n\n'),
  }
}
