import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { lectureFiles, ROOT, QUIZ_SOURCE } from './learn/paths.mjs'
import { parseLectures } from './learn/lectures.mjs'
import { parseQuiz } from './learn/quiz.mjs'
import { buildSql } from './learn/sql.mjs'
import { courseMeta } from './learn/meta.mjs'

async function main() {
  const lectures = await parseLectures(await lectureFiles())
  const quizText = await readFile(QUIZ_SOURCE, 'utf8')
  const quiz = parseQuiz(quizText)
  const target = join(ROOT, 'dist/learn-d1.sql')
  await mkdir(join(ROOT, 'dist'), { recursive: true })
  await writeFile(target, buildSql({ meta: courseMeta(), lectures, quiz }))
  console.log(`${lectures.length} lectures, ${quiz.length} quiz questions -> ${target}`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
