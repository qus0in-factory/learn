import { labels } from './labels.mjs'
import { tagLabels } from './tag-labels.mjs'
import commands from './commands.json' with { type: 'json' }
import { appendixGroups } from './appendix-nav.mjs'

export const navGroups = [
  { text: labels.courseTitle, directory: '' },
  { id: 'appendix', text: labels.appendix, groups: appendixGroups, collapsed: true },
  { text: labels.commands, directory: 'commands/', collapsed: true, order: commands.order },
  { text: labels.tags, items: [{ text: tagLabels.title, link: '/git/tags' }] },
]
