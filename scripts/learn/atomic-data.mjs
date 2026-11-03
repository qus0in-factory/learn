export const meta = { title: 'T', version: 'v0.2.0', syncedAt: '2026-01-01T00:00:00.000Z' }
export const lectures = Array.from({ length: 12 }, (_, i) => ({
  slug: `${String(i + 1).padStart(2, '0')}-x`, day: 1, position: i + 1, title: 'T', schedule: 'S',
}))
export const quiz = Array.from({ length: 10 }, (_, i) => ({
  position: i + 1, question: 'Q', answer: 'A', lesson: '01-x',
}))
