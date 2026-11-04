import { labels } from './labels.mjs'
import { tagLabels } from './tag-labels.mjs'
import { commandGroups } from './command-nav.mjs'
import { glossaryLabels } from './glossary-labels.mjs'
import { appendixGroups } from './appendix-nav.mjs'

export const navGroups = [
  { text: labels.courseTitle, directory: '' },
  { id: 'appendix', text: labels.appendix, groups: appendixGroups, collapsed: true },
  { id: 'commands', text: labels.commands, groups: commandGroups, collapsed: true },
  { items: [
    { text: tagLabels.title, link: '/git/tags' },
    { text: glossaryLabels.title, link: '/git/glossary' },
  ] },
]
