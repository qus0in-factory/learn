import { loadLectures, loadMeta, loadQuiz } from './store.js'

export async function loadCatalog(db) {
  const [meta, lectures, quiz] = await Promise.all([
    loadMeta(db),
    loadLectures(db),
    loadQuiz(db),
  ])
  if (!meta) throw new Error('catalog not initialized')
  return {
    version: meta.asset_version,
    title: meta.title,
    syncedAt: meta.synced_at,
    lectures: lectures.map((lecture) => ({
      slug: lecture.slug,
      day: lecture.day,
      position: lecture.position,
      title: lecture.title,
      schedule: lecture.schedule,
      pdf: lecture.pdf,
    })),
    quiz: quiz.map((question) => ({
      position: question.position,
      question: question.question,
      answer: question.answer,
      lesson: question.lesson_slug,
    })),
  }
}
