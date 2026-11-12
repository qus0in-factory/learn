import { courseOrder } from './nav.mjs'
import { courses } from './courses.mjs'
import { labels } from './labels.mjs'
import { markdownIllustrations } from './markdown-illustrations.mjs'
import { markdownLinks as links } from './markdown-links.mjs'
import { markdownWidgets } from './markdown-widgets.mjs'
import { appendixSections } from './appendix-sections.mjs'
import { markdownStatic } from './markdown-static.mjs'

export function markdownComponents(text, page) {
  return markdownIllustrations(markdownWidgets(markdownStatic(text, page), page)).replace('<CourseList />', links(courses.map(c => ({ text: c.title, link: c.link }))))
    .replace('<CourseContents />', links(courseOrder.filter(c => /^\/git\/\d/.test(c.link))))
    .replace('<AppendixContents />', appendixSections(group => links(group.items)))
    .replace('{{ learningGoals }}', labels.learningGoals).replace('{{ appendix }}', labels.appendix)
}
