const QUESTION = /^(\d+)\. (.+)$/
const ROW = /^\| (\d+) \| (.+) \| (.+?) \|$/

export function scanQuiz(text) {
  const questions = []
  const answers = new Map()
  let section = ''
  for (const raw of text.split('\n')) {
    const line = raw.trim()
    if (line.startsWith('## ')) {
      section = line.slice(3)
      continue
    }
    if (section === '문항') {
      const match = line.match(QUESTION)
      if (match) questions.push({ position: Number(match[1]), question: match[2] })
    } else if (section === '해설') {
      const match = line.match(ROW)
      if (match && match[1] !== '번호') answers.set(Number(match[1]), match)
    }
  }
  return { questions, answers }
}
