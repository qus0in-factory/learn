import { themeConfig as base } from './pdf.mjs'
import { courseUpdated } from './updated.mjs'
import { search } from './search.mjs'
import { appendixNavigation } from './nav.mjs'
import { glossary } from './glossary.mjs'

export const themeConfig = { ...base, courseUpdated: courseUpdated(), search, appendixNavigation, glossary }
