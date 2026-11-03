export function seed(db) {
  const insertLecture = db.prepare('INSERT INTO lectures (slug,day,position,title,schedule) VALUES (?,1,?,?,?)')
  const insertPdf = db.prepare('INSERT INTO pdf_assets (lesson_slug,file_name,url) VALUES (?,?,?)')
  const insertQuiz = db.prepare('INSERT INTO quiz_questions (position,question,answer,lesson_slug) VALUES (?,?,?,?)')
  for (let i = 1; i <= 12; i += 1) {
    const slug = `${String(i).padStart(2, '0')}-x`
    insertLecture.run(slug, i, 'T', 'S')
    insertPdf.run(slug, `${slug}.pdf`, 'https://example.test/x.pdf')
  }
  for (let i = 1; i <= 10; i += 1) insertQuiz.run(i, 'Q', 'A', '01-x')
  db.prepare('INSERT INTO course_meta (id,title,asset_version,synced_at) VALUES (1,?,?,?)')
    .run('T', 'v0.1.0', 'legacy')
}

export const d1 = (db) => ({
  prepare: (sql) => ({ all: async () => ({ results: db.prepare(sql).all() }) }),
})
