import { DatabaseSync } from 'node:sqlite'
import { readFileSync } from 'node:fs'
import { loadCatalog } from '../../learn-worker/catalog.js'
import { d1, seed } from './atomic-fixture.mjs'

const read = (name) => readFileSync(new URL(`../../learn-worker/migrations/${name}`, import.meta.url), 'utf8')

export function setup() {
  const db = new DatabaseSync(':memory:')
  db.exec(read('0001_init.sql'))
  seed(db)
  db.exec(read('0002_catalog_versions.sql'))
  db.exec(read('0003_quiz_links.sql'))
  return { db, api: d1(db) }
}

export async function counts(api) {
  const c = await loadCatalog(api)
  return [c.lectures.length, c.lectures.filter((x) => x.pdf).length, c.quiz.length]
}

export const version = async (api) => (await loadCatalog(api)).version
