import { parseLinks } from './links.mjs'
import { scanQuiz } from './quiz-scan.mjs'

export function parseQuiz(text) {
  const { questions, answers } = scanQuiz(text)
  if (!questions.length) throw Error('empty quiz')
  return questions.map((question) => {
    const row = answers.get(question.position)
    if (!row) throw new Error(`missing quiz answer: ${question.position}`)
    const lessons = parseLinks(row[3])
    return { ...question, answer: row[2], lesson: lessons[0] || null, lessons }
  })
}
