import { courseFrontmatter } from './course-frontmatter.mjs'

export const frontmatterList = courseFrontmatter(new URL('../../docs/lecture/', import.meta.url), '/git/')
