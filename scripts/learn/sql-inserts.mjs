import { pdfUrl } from '../../learn-site/.vitepress/pdf-url.mjs'
import { insertUnlessActive } from './sql-values.mjs'
import { linkInsert } from './sql-links.mjs'

export function inserts({ version, meta, lectures, quiz }) {
  const v = version
  const pdfs = lectures.map((l) => [v, l.slug, `${l.slug}.pdf`, pdfUrl(`${l.slug}.pdf`)])
  return [
    insertUnlessActive('catalog_versions', 'catalog_version,title,asset_version,synced_at', [[v, meta.title, meta.version, meta.syncedAt]], v),
    insertUnlessActive('catalog_lectures', 'catalog_version,slug,day,position,title,schedule', lectures.map((l) => [v, l.slug, l.day, l.position, l.title, l.schedule]), v),
    insertUnlessActive('catalog_pdfs', 'catalog_version,lesson_slug,file_name,url', pdfs, v),
    insertUnlessActive('catalog_quiz', 'catalog_version,position,question,answer,lesson_slug', quiz.map((q) => [v, q.position, q.question, q.answer, q.lesson]), v),
    linkInsert(v, quiz),
  ].join('\n')
}
