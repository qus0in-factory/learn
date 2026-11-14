import { labels } from './labels.mjs'
import { tagLabels } from './tag-labels.mjs'
import { commandGroups } from './command-nav.mjs'
import { glossaryLabels } from './glossary-labels.mjs'
import { appendixGroups } from './appendix-nav.mjs'

export const navGroups = [
  { text: labels.courseTitle, groups: [
    { text: 'Git Newbie', directory: '', order: ['01-environment', '02-local-repository', '03-commit-history', '04-amend-ignore'] },
    { text: 'Git Amateur', directory: '', order: ['05-remote', '06-pages', '07-markdown-mermaid', '08-profile-records'] },
    { text: 'Git Pro', directory: '', order: ['09-issues', '10-branches-tags', '11-merge-conflicts', '12-pull-request'] },
  ] },
  { id: 'appendix', text: labels.appendix, groups: appendixGroups, collapsed: true },
  { id: 'commands', text: labels.commands, groups: commandGroups, collapsed: true },
  { items: [
    { text: tagLabels.title, link: '/git/tags' },
    { text: glossaryLabels.title, link: '/git/glossary' },
  ] },
]
