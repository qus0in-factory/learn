import { readFileSync } from 'node:fs'
import { posix } from 'node:path'
import { markdownPath, absolute } from './seo-paths.mjs'
import { markdownComponents } from './markdown-components.mjs'
import { markdownInstall } from './markdown-install.mjs'

export function exportMarkdown(page, records) {
  let text = readFileSync(new URL(`../../docs/${page.source}`, import.meta.url), 'utf8')
    .replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/^# .+\r?\n/m, '')
  text = markdownComponents(text, page).replace(/\]\(([^)\s]+\.md)(#[^)]*)?\)/g, (all, href, hash = '') => {
    if (/^https?:/.test(href)) return all
    const source = posix.normalize(posix.join(posix.dirname(page.source), href))
    const target = records.find(item => item.source === source)
    return target ? `](${absolute(markdownPath(target.path))}${hash})` : all
  })
  return `# ${page.title}\n\n> ${page.description}\n\n${markdownInstall(page)}${text.trim()}\n`
}
