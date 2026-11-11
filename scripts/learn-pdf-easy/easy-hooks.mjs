import { registerHooks } from 'node:module'

// pilot/contract.mjs reads pilot/subjects.json (steps 01–12), so the easy decks
// stub it out; layout variety is checked later by the easy verify.
// pilot/media.mjs is redirected to the real easy module instead of inline source.
const stub = 'export async function contract(){}\n'
const subject = 'export * from ' + JSON.stringify(new URL('./easy-subject.mjs', import.meta.url).href)

registerHooks({ load(url, context, next) {
  if (url.endsWith('/pilot/contract.mjs'))
    return { format: 'module', source: stub, shortCircuit: true }
  if (url.endsWith('/pilot/subject.mjs'))
    return { format: 'module', source: subject, shortCircuit: true }
  if (url.endsWith('/pilot/media.mjs'))
    return { format: 'module',
      source: 'export * from ' + JSON.stringify(new URL('./easy-media.mjs', import.meta.url).href),
      shortCircuit: true }
  return next(url, context)
} })
