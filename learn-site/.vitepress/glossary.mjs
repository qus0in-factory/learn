import { readFileSync } from 'node:fs'
import { courseContents } from './course-contents.mjs'
import { tagSlug } from './tag-slug.mjs'

// docs/lecture/glossary.json is the source; step/command links resolve to sidebar titles at build time.
const data = JSON.parse(readFileSync(new URL('../../docs/lecture/glossary.json', import.meta.url), 'utf8'))
const page = Object.fromEntries(courseContents.map(i => [i.link, i]))
const link = (ref) => page[`/git/${ref}`] && { link: `/git/${ref}`, text: page[`/git/${ref}`].text, order: page[`/git/${ref}`].order }
export const glossary = {
  groups: data.groups.map(g => ({ ...g, terms: data.terms.filter(t => t.group === g.id).map(t => ({
    ...t,
    steps: t.steps.map(link).filter(Boolean),
    commands: t.commands.map(c => link(`commands/${c}`)).filter(Boolean),
    tags: t.tags.map(tag => ({ tag, slug: tagSlug(tag) })),
  })) })),
}
