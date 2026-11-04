import links from './install-links.json' with { type: 'json' }
import { installPage } from './install-page.mjs'
import { stepLabels } from './step-labels.mjs'
import { absolute, markdownPath } from './seo-paths.mjs'

export function markdownInstall(page) {
  if (page.installation) return `[${installPage.title}](${absolute(markdownPath(installPage.link))})\n\n`
  if (!page.downloads?.length) return ''
  const items = page.downloads.map(id => links.find(link => link.id === id)).filter(Boolean)
  return items.map(item => `- [${item.name}](${item.url})`).join('\n')
    + `\n\n${stepLabels.installNotes.join('\n\n')}\n\n`
}
