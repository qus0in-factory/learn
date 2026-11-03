import { labels } from './labels.mjs'
import { tagLabels } from './tag-labels.mjs'
import commands from './commands.json' with { type: 'json' }

export const navGroups = [
  { text: labels.courseTitle, directory: '' },
  { text: labels.appendix, directory: 'appendix/', collapsed: true },
  { text: labels.commands, directory: 'commands/', collapsed: true, order: commands.order },
  { text: labels.tags, items: [{ text: tagLabels.title, link: '/git/tags' }] },
]
