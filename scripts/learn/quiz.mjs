const QUESTION = /^(\d+)\. (.+)$/
const ROW = /^\| (\d+) \| (.+) \| (.+?) \|$/
const LINK = /\.\.\/(\d{2}-[\w-]+)\.md/

export function parseQuiz(text) {
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
  return questions.map((question) => {
    const row = answers.get(question.position)
    if (!row) throw new Error(`missing quiz answer: ${question.position}`)
    return {
      ...question,
      answer: row[2],
      lesson: (row[3].match(LINK) || [])[1] || null,
    }
  })
}
