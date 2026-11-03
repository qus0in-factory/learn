import { courseQr } from './course-qr.mjs'
import { themeLabelPlugin } from './theme-label-plugin.mjs'

export const sitePlugins = [courseQr(), themeLabelPlugin()]
