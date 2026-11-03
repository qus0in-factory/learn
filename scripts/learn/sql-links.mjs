import { insert } from './sql-values.mjs'

export function linkInsert(version, quiz) {
  const rows = quiz.flatMap((q) =>
    [...new Set(q.lessons || [q.lesson])].filter(Boolean).map((slug, i) => [version, q.position, i, slug]),
  )
  if (rows.length < quiz.length) throw new Error('quiz without lesson')
  return insert('quiz_links', 'catalog_version,quiz_position,link_position,lesson_slug', rows)
}
