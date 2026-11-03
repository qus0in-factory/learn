import { courseOrder } from './nav.mjs'
import { courses } from './courses.mjs'
import { labels } from './labels.mjs'
import { markdownIllustrations } from './markdown-illustrations.mjs'
import { markdownLinks as links } from './markdown-links.mjs'
import { markdownWidgets } from './markdown-widgets.mjs'

export function markdownComponents(text, page) {
  return markdownIllustrations(markdownWidgets(text, page)).replace('<CourseList />', links(courses.map(c => ({ text: c.title, link: c.link }))))
    .replace('<CourseContents />', links(courseOrder.filter(c => /^\/git\/\d/.test(c.link))))
    .replace('<AppendixContents />', links(courseOrder.filter(c => c.link.includes('/appendix/'))))
    .replace('{{ learningGoals }}', labels.learningGoals).replace('{{ appendix }}', labels.appendix)
}
