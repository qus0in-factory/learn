import { themeConfig as base } from './pdf.mjs'
import { courseUpdated } from './updated.mjs'
import { search } from './search.mjs'
import { appendixNavigation } from './nav.mjs'
import { glossary } from './glossary.mjs'
import { easySidebar } from './easy-nav.mjs'

const sidebar = { ...base.sidebar, ...easySidebar }
export const themeConfig = { ...base, sidebar, courseUpdated: courseUpdated(), search, appendixNavigation, glossary }
