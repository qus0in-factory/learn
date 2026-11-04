import { courseQr } from './course-qr.mjs'
import { themeLabelPlugin } from './theme-label-plugin.mjs'
import { navIcons } from './nav-icons-plugin.mjs'

export const sitePlugins = [courseQr(), themeLabelPlugin(), navIcons()]
