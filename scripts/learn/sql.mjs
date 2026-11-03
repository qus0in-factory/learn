import { pdfUrl } from '../../learn-site/.vitepress/pdf-url.mjs'
import { insert } from './sql-values.mjs'

const refresh = `DELETE FROM quiz_questions;
DELETE FROM pdf_assets;
DELETE FROM lectures;
DELETE FROM course_meta;`

export function buildSql({ meta, lectures, quiz }) {
  if (!lectures?.length) throw new Error('no lectures')
  if (!quiz?.length) throw new Error('no quiz questions')
  const pdfs = lectures.map((l) => [l.slug, `${l.slug}.pdf`, pdfUrl(`${l.slug}.pdf`)])
  const questions = quiz.map((q) => [q.position, q.question, q.answer, q.lesson])
  return [
    refresh,
    insert('course_meta', 'id,title,asset_version,synced_at', [[1, meta.title, meta.version, meta.syncedAt]]),
    insert('lectures', 'slug,day,position,title,schedule', lectures.map((l) => [l.slug, l.day, l.position, l.title, l.schedule])),
    insert('pdf_assets', 'lesson_slug,file_name,url', pdfs),
    insert('quiz_questions', 'position,question,answer,lesson_slug', questions),
    '',
  ].join('\n')
}
