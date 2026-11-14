import { sidebar } from './nav.mjs'
import { site } from './site.mjs'
import { pdfUrl, revision } from './pdf-url.mjs'
import { labels as l } from './labels.mjs'
import { courseLessons } from './course-data.mjs'
import { easyLessons } from './easy-pdf.mjs'
import { courseContents } from './course-contents.mjs'
import { tagGroups, easyTagGroups } from './tag-groups.mjs'

export { revision }

export const themeConfig = {
  logo: site.logo, nav: [], courseLessons, easyLessons, courseContents, tagGroups, easyTagGroups,
  outline: { label: l.outline }, docFooter: { prev: l.previous, next: l.next },
  sidebarMenuLabel: l.menu, returnToTopLabel: l.top,
  darkModeSwitchLabel: l.appearance, darkModeSwitchTitle: l.dark, lightModeSwitchTitle: l.light,
  lastUpdated: false, skipToContentLabel: l.skip, langMenuLabel: l.language, sidebar,
}

export const transformPageData = p => {
  if (/^(?:lecture|git)\/(0[1-9]|1[0-2])-[\w-]+\.md$/.test(p.relativePath)) {
    p.frontmatter.pdf = pdfUrl(p.relativePath.split('/').pop().replace('.md', '.pdf'))
  }
}
