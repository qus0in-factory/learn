import { readFileSync } from 'node:fs'
import { courseContents } from './course-contents.mjs'
import { easySidebar } from './easy-nav.mjs'
import { tagSlug } from './tag-slug.mjs'

const flatten = items => items.flatMap(item => item.items ? flatten(item.items) : [item])
const loadData = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'))

export function buildGlossary(data, prefix, pageMap) {
  const link = ref => pageMap[`${prefix}/${ref}`] && {
    link: `${prefix}/${ref}`,
    text: pageMap[`${prefix}/${ref}`].text,
    order: pageMap[`${prefix}/${ref}`].order,
  }
  return {
    groups: data.groups.map(g => ({
      ...g,
      terms: data.terms.filter(t => t.group === g.id).map(t => ({
        ...t,
        steps: t.steps.map(link).filter(Boolean),
        commands: (t.commands || []).map(c => link(`commands/${c}`)).filter(Boolean),
        tags: (t.tags || []).map(tag => ({ tag, slug: tagSlug(tag) })),
      })),
    })),
  }
}

const gitPages = Object.fromEntries(courseContents.map(i => [i.link, i]))
const easyPages = Object.fromEntries(flatten(easySidebar['/git-easy/']).map(i => [i.link, i]))

export const glossary = buildGlossary(loadData('../../docs/lecture/glossary.json'), '/git', gitPages)
export const easyGlossary = buildGlossary(loadData('../../docs/easy/glossary.json'), '/git-easy', easyPages)
