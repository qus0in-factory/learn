import { navGroups } from './nav-groups.mjs'
import { navItems } from './nav-items.mjs'

function node(group) {
  return { text: group.text, id: group.id,
    ...(group.collapsed === undefined ? {} : { collapsed: group.collapsed }),
    items: group.groups ? group.groups.map(node) : navItems(group) }
}
const flatten = items => items.flatMap(item => item.items ? flatten(item.items) : [item])
export const sidebar = { '/git/': navGroups.map(node) }
export const courseOrder = flatten(sidebar['/git/'])
export const appendixNavigation = sidebar['/git/'].find(group => group.id === 'appendix').items
