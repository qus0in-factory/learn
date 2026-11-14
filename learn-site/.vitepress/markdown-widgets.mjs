import { tagGroups, easyTagGroups } from './tag-groups.mjs'
import { courseOrder } from './nav.mjs'
import { markdownLinks } from './markdown-links.mjs'
import { courseOf, coursePrefix } from './seo-course-of.mjs'
import { sortedGroups } from './theme/tag-group-items.mjs'

export function markdownWidgets(text, page) {
  const prefix = coursePrefix(page.path)
  const refs = (page.stepRefs || []).map(ref => courseOrder.find(item => item.link === `${prefix}/${ref}`)).filter(Boolean)
  const courseTags = courseOf(page.path).course?.id === 'git-easy' ? easyTagGroups : tagGroups
  const groups = sortedGroups(courseTags).map(group => `## ${group.tag}\n\n${markdownLinks([...group.pages, ...group.commands])}`).join('\n\n')
  return text.replace('<CourseHeader />', '').replace(' <QuizHelp />', '').replace('<TagGroups />', groups)
    .replace('<CommandLinks />', markdownLinks(refs))
}
