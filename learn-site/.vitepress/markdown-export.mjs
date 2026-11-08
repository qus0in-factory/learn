import { markdownSource } from './markdown-source.mjs'
import { markdownMetadata } from './markdown-metadata.mjs'
import { posix } from 'node:path'
import { markdownPath, absolute } from './seo-paths.mjs'
import { markdownComponents } from './markdown-components.mjs'
import { markdownInstall } from './markdown-install.mjs'

export function exportMarkdown(page, records) {
  let text = markdownSource(page.source).replace(/^# .+\r?\n/m, '')
  text = markdownComponents(text, page).replace(/\]\(([^)\s]+\.md)(#[^)]*)?\)/g, (all, href, hash = '') => {
    if (/^https?:/.test(href)) return all
    const source = posix.normalize(posix.join(posix.dirname(page.source), href))
    const target = records.find(item => item.source === source)
    return target ? `](${absolute(markdownPath(target.path))}${hash})` : all
  })
  return `# ${page.title}\n\n> ${page.description}\n\n${markdownMetadata(page)}${markdownInstall(page)}${text.trim()}\n`
}
