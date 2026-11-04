import { commandOrder } from '../command-nav.mjs'

// Command links inside a tag group follow the reference order; pages keep course order.
const rank = (item) => commandOrder.indexOf(item.link.split('/').at(-1))
export const sortedGroups = (groups) =>
  groups.map((g) => ({ ...g, commands: [...g.commands].sort((a, b) => rank(a) - rank(b)) }))
export const itemLabel = (item) => (item.order ? `${item.order} ${item.text}` : item.text)
