import { pdfUrl } from '../../learn-site/.vitepress/pdf-url.mjs'
import { insert } from './sql-values.mjs'
import { linkInsert } from './sql-links.mjs'

export function inserts({ version, meta, lectures, quiz }) {
  const v = version
  const pdfs = lectures.map((l) => [v, l.slug, `${l.slug}.pdf`, pdfUrl(`${l.slug}.pdf`)])
  return [
    insert('catalog_versions', 'catalog_version,title,asset_version,synced_at', [[v, meta.title, meta.version, meta.syncedAt]]),
    insert('catalog_lectures', 'catalog_version,slug,day,position,title,schedule', lectures.map((l) => [v, l.slug, l.day, l.position, l.title, l.schedule])),
    insert('catalog_pdfs', 'catalog_version,lesson_slug,file_name,url', pdfs),
    insert('catalog_quiz', 'catalog_version,position,question,answer,lesson_slug', quiz.map((q) => [v, q.position, q.question, q.answer, q.lesson])),
    linkInsert(v, quiz),
  ].join('\n')
}
