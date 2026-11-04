import commands from './commands.json' with { type: 'json' }
import { commandLabels } from './command-labels.mjs'

export const commandGroups = Object.entries(commands.groups).map(([id, order]) => ({
  id, text: commandLabels[id], order, directory: 'commands/', collapsed: true,
}))
export const commandOrder = commandGroups.flatMap(group => group.order)
