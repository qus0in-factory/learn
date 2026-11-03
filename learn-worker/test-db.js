const catalog = {
  meta: { title: 'Git과 웹 배포 강의', version: 'v0.1.0', syncedAt: 'now' },
  lectures: [{ slug: '01-environment', day: 1, position: 1, title: 'T', schedule: 'S', pdf: 'P' }],
  quiz: [{ position: 1, question: 'Q', answer: 'A', lesson: '01-environment' }],
}

export const db = {
  prepare(sql) {
    if (!sql.includes('json_object')) throw new Error('unexpected query')
    return { all: async () => ({ results: [{ catalog: JSON.stringify(catalog) }] }) }
  },
}
