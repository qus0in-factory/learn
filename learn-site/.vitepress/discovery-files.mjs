import { absolute, markdownPath } from './seo-paths.mjs'
import { site } from './site.mjs'

export function discoveryFiles(records, bodies) {
  return {
    'robots.txt': `User-agent: *\nAllow: /\nSitemap: ${absolute('/sitemap.xml')}\n`,
    'llms.txt': `# ${site.title}\n\n> ${site.subtitle}\n\n${records.map(p => `- [${p.title}](${absolute(markdownPath(p.path))})`).join('\n')}\n`,
    'llms-full.txt': bodies.join('\n\n---\n\n'),
  }
}
