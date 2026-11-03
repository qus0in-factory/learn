import { begin, finish } from './sql-sync.mjs'
import { inserts } from './sql-inserts.mjs'

export function buildSql({ meta, lectures, quiz }) {
  if (!lectures?.length) throw new Error('no lectures')
  if (!quiz?.length) throw new Error('no quiz questions')
  const version = `sync-${meta.syncedAt}`
  return [
    begin(),
    inserts({ version, meta, lectures, quiz }),
    finish(version),
    '',
  ].join('\n')
}
