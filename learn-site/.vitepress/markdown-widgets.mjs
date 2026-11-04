import { tagGroups } from './tag-groups.mjs'
import { courseOrder } from './nav.mjs'
import { markdownLinks } from './markdown-links.mjs'
import { sortedGroups } from './theme/tag-group-items.mjs'

export function markdownWidgets(text, page) {
  const refs = (page.stepRefs || []).map(ref => courseOrder.find(item => item.link === `/git/${ref}`)).filter(Boolean)
  const groups = sortedGroups(tagGroups).map(group => `## ${group.tag}\n\n${markdownLinks([...group.pages, ...group.commands])}`).join('\n\n')
  return text.replace('<CourseHeader />', '').replace(' <QuizHelp />', '').replace('<TagGroups />', groups)
    .replace('<CommandLinks />', markdownLinks(refs))
}
