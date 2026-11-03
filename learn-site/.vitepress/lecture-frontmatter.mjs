import { readdirSync, readFileSync } from 'node:fs'

const dir = new URL('../../docs/lecture/', import.meta.url)

// Reads one array-valued frontmatter key (e.g. tags, stepRefs) from every page in a lecture subfolder.
export function frontmatterList(sub, key) {
  return readdirSync(new URL(sub, dir)).filter(f => f.endsWith('.md')).map(f => {
    const m = readFileSync(new URL(sub + f, dir), 'utf8').match(new RegExp(`^${key}:\\s*(\\[.*\\])`, 'm'))
    return { link: `/git/${sub}${f.replace(/\.md$/, '')}`, values: m ? JSON.parse(m[1]) : [] }
  })
}
