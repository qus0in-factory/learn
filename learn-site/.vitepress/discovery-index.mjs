import { absolute, markdownPath } from './seo-paths.mjs'
import { markdownMetadata } from './markdown-metadata.mjs'
import meta from './seo-meta.json' with { type: 'json' }

const group = path => path.includes('/appendix/') ? 1 : path.includes('/commands/') ? 2
  : path === '/git/' || /^\/git\/\d/.test(path) ? 0 : 3

export function discoveryIndex(records) {
  const updated = records.map(p => p.updated).filter(Boolean).sort().at(-1)
  return markdownMetadata({ updated }) + meta.sections.map((title, index) =>
    `## ${title}\n\n` + records.filter(p => group(p.path) === index).map(p =>
      `- [${p.title}](${absolute(markdownPath(p.path))}): ${p.description} (updated: ${p.updated?.slice(0, 10) || ''})`
    ).join('\n')).join('\n\n') + '\n'
}
