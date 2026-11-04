import { labels } from './labels.mjs'
import { tagLabels } from './tag-labels.mjs'
import { commandGroups } from './command-nav.mjs'
import { appendixGroups } from './appendix-nav.mjs'

export const navGroups = [
  { text: labels.courseTitle, directory: '' },
  { id: 'appendix', text: labels.appendix, groups: appendixGroups, collapsed: true },
  { id: 'commands', text: labels.commands, groups: commandGroups, collapsed: true },
  { text: labels.tags, items: [{ text: tagLabels.title, link: '/git/tags' }] },
]
