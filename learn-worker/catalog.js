import { rows } from './store.js'
import { catalogSql } from './catalog-sql.mjs'

const byPosition = (items) => [...items].sort((a, b) => a.position - b.position)

export async function loadCatalog(db) {
  const [row] = await rows(db, catalogSql)
  const data = JSON.parse(row.catalog)
  if (!data.meta) throw new Error('catalog not initialized')
  return { ...data.meta, lectures: byPosition(data.lectures), quiz: byPosition(data.quiz) }
}
