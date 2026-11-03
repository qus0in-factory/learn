import { navGroups } from './nav-groups.mjs'
import { navItems } from './nav-items.mjs'

export const sidebar = { '/git/': navGroups.map(group => ({
  text: group.text, ...(group.collapsed === undefined ? {} : { collapsed: group.collapsed }),
  items: navItems(group),
})) }
export const courseOrder = sidebar['/git/'].flatMap(group => group.items)
