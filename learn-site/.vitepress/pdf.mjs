import { sidebar } from './nav.mjs'
import { site } from './site.mjs'
import { pdfUrl, revision } from './pdf-url.mjs'
import { labels } from './labels.mjs'
import { courseLessons } from './course-data.mjs'
import { courseContents } from './course-contents.mjs'
import { tagGroups } from './tag-groups.mjs'

export { revision }

export const themeConfig = {
  logo: site.logo,
  nav: [],
  courseLessons,
  courseContents,
  tagGroups,
  outline: { label: labels.outline },
  docFooter: { prev: labels.previous, next: labels.next },
  sidebarMenuLabel: labels.menu,
  returnToTopLabel: labels.top,
  darkModeSwitchLabel: labels.appearance,
  darkModeSwitchTitle: labels.dark,
  lightModeSwitchTitle: labels.light,
  lastUpdated: false,
  skipToContentLabel: labels.skip,
  langMenuLabel: labels.language,
  sidebar,
}

export function transformPageData(page) {
  if (/^(?:lecture|git)\/(0[1-9]|1[0-2])-[\w-]+\.md$/.test(page.relativePath)) {
    page.frontmatter.pdf = pdfUrl(page.relativePath.split('/').at(-1).replace(/\.md$/, '.pdf'))
  }
}
