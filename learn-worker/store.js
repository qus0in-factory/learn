export async function rows(db, sql) {
  const { results } = await db.prepare(sql).all()
  return results
}

export const loadMeta = async (db) =>
  (await rows(db, 'SELECT title,asset_version,synced_at FROM course_meta WHERE id = 1'))[0]

export const loadLectures = (db) =>
  rows(db, `SELECT l.slug,l.day,l.position,l.title,l.schedule,p.url AS pdf
    FROM lectures l LEFT JOIN pdf_assets p ON p.lesson_slug = l.slug
    ORDER BY l.position`)

export const loadQuiz = (db) =>
  rows(db, 'SELECT position,question,answer,lesson_slug FROM quiz_questions ORDER BY position')
