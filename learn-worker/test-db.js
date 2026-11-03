export const results = {
  course_meta: [{ title: 'Git과 웹 배포 강의', asset_version: 'v0.1.0', synced_at: 'now' }],
  lectures: [{ slug: '01-environment', day: 1, position: 1, title: 'T', schedule: 'S', pdf: 'P' }],
  quiz_questions: [{ position: 1, question: 'Q', answer: 'A', lesson_slug: '01-environment' }],
}

export const db = {
  prepare(sql) {
    const key = Object.keys(results).find((name) => sql.includes(name))
    return { all: async () => ({ results: results[key] }) }
  },
}
