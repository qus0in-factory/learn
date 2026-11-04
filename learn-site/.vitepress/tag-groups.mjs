import { courseContents } from './course-contents.mjs'
import { frontmatterList } from './lecture-frontmatter.mjs'
import { tagSlug } from './tag-slug.mjs'

// Step tags are the source; commands inherit stepRefs tags
const page = Object.fromEntries(courseContents.map(i => [i.link, { text: i.text, link: i.link, order: i.order }]))
const list = (sub, key) => frontmatterList(sub, key).filter(p => page[p.link])
const tagged = [...list('', 'tags'), ...list('appendix/', 'tags')]
const groups = new Map()
const add = (tag, kind, link) => {
  const g = groups.get(tag) || groups.set(tag, { tag, slug: tagSlug(tag), pages: [], commands: [] }).get(tag)
  if (!g[kind].some(x => x.link === link)) g[kind].push(page[link])
}
for (const p of tagged) for (const tag of p.values) add(tag, 'pages', p.link)
for (const c of list('commands/', 'stepRefs')) for (const ref of c.values)
  for (const tag of tagged.find(p => p.link === `/git/${ref}`)?.values || []) add(tag, 'commands', c.link)
export const tagGroups = [...groups.values()]
