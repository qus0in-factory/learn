import { courseContents } from './course-contents.mjs'
import { frontmatterList } from './lecture-frontmatter.mjs'
import { courseFrontmatter } from './course-frontmatter.mjs'
import { easySidebar } from './easy-nav.mjs'
import { tagSlug } from './tag-slug.mjs'

// Step tags are the source; commands inherit stepRefs tags.
export function buildTagGroups({ pageMap, taggedLists, commandRefs = [] }) {
  const tagged = taggedLists.flat().filter(p => pageMap[p.link])
  const groups = new Map()
  const add = (tag, kind, link) => {
    const g = groups.get(tag) || groups.set(tag, { tag, slug: tagSlug(tag), pages: [], commands: [] }).get(tag)
    if (!g[kind].some(x => x.link === link)) g[kind].push(pageMap[link])
  }
  for (const p of tagged) for (const tag of p.values) add(tag, 'pages', p.link)
  for (const c of commandRefs.filter(c => pageMap[c.link])) for (const ref of c.values) {
    const prefix = c.link.slice(0, c.link.indexOf('/commands/') + 1)
    for (const tag of tagged.find(p => p.link === `${prefix}${ref}`)?.values || []) add(tag, 'commands', c.link)
  }
  return [...groups.values()]
}

const gitPages = Object.fromEntries(courseContents.map(i => [i.link, { text: i.text, link: i.link, order: i.order }]))
export const tagGroups = buildTagGroups({
  pageMap: gitPages,
  taggedLists: [frontmatterList('', 'tags'), frontmatterList('appendix/', 'tags')],
  commandRefs: frontmatterList('commands/', 'stepRefs'),
})

const flatten = items => items.flatMap(item => item.items ? flatten(item.items) : [item])
const easyPages = Object.fromEntries(flatten(easySidebar['/git-easy/']).map(i => [i.link, i]))
const easyList = courseFrontmatter(new URL('../../docs/easy/', import.meta.url), '/git-easy/')
export const easyTagGroups = buildTagGroups({
  pageMap: easyPages,
  taggedLists: ['', 'github-practice/', 'git-practice/'].map(sub => easyList(sub, 'tags')),
})
