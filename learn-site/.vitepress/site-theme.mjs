import { themeConfig as base } from './pdf.mjs'
import { courseUpdated } from './updated.mjs'
import { search } from './search.mjs'

export const themeConfig = { ...base, courseUpdated: courseUpdated(), search }
