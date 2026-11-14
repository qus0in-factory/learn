import { readdirSync, readFileSync } from 'node:fs'

// Read an array-valued frontmatter key from each Markdown page in a course folder.
export function courseFrontmatter(docsDir, urlPrefix) {
  return (sub, key) => readdirSync(new URL(sub, docsDir)).filter(f => f.endsWith('.md')).map(f => {
    const text = readFileSync(new URL(sub + f, docsDir), 'utf8')
    const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] || ''
    const match = frontmatter.match(new RegExp(`^${key}:\\s*(\\[.*\\])`, 'm'))
    return { link: `${urlPrefix}${sub}${f.replace(/\.md$/, '')}`, values: match ? JSON.parse(match[1]) : [] }
  })
}
