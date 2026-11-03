import { courseOrder } from './nav.mjs'
import { courses } from './courses.mjs'
import { labels } from './labels.mjs'
import { cdnUrl } from './cdn-url.mjs'
import { markdownLinks as links } from './markdown-links.mjs'
import { markdownWidgets } from './markdown-widgets.mjs'

export function markdownComponents(text, page) {
  return markdownWidgets(text, page).replace('<CourseList />', links(courses.map(c => ({ text: c.title, link: c.link }))))
    .replace('<CourseContents />', links(courseOrder.filter(c => /^\/git\/\d/.test(c.link))))
    .replace('<AppendixContents />', links(courseOrder.filter(c => c.link.includes('/appendix/'))))
    .replace('{{ learningGoals }}', labels.learningGoals).replace('{{ appendix }}', labels.appendix)
    .replace('<GitStages />', `![${page.alt || ''}](${cdnUrl('/git-stages-1000.webp', process.env.VITE_ASSET_CDN_BASE_URL)})`)
}
