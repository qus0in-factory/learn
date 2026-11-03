import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { lectureFiles, pdfRoot, ROOT } from './paths.mjs'
import { parseLectures } from './lectures.mjs'
import { parseQuiz } from './quiz.mjs'
import { courseMeta } from './meta.mjs'

const quizText = () => readFile(ROOT + 'docs/lecture/supplement/02-review-quiz.md', 'utf8')

test('markdown yields 12 lectures and 10 linked quiz answers', async () => {
  const lectures = await parseLectures(await lectureFiles())
  const questions = parseQuiz(await quizText())
  assert.equal(lectures.length, 12)
  assert.equal(lectures[0].slug, '01-environment')
  assert.equal(lectures[0].day, 1)
  assert.equal(questions.length, 10)
  assert.ok(questions.every((question) => question.lesson))
})

test('pdf root and version come from the site pdf config', async () => {
  const meta = courseMeta(await pdfRoot())
  assert.equal(meta.version, 'v0.1.0')
  assert.equal(meta.root, 'https://files.qus0in.dev/v0.1.0/')
})
