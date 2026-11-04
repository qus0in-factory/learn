import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { lectureFiles, QUIZ_SOURCE } from './paths.mjs'
import { parseLectures, parseLectureText } from './lectures.mjs'
import { parseQuiz } from './quiz.mjs'

const quizText = () => readFile(QUIZ_SOURCE, 'utf8')

test('markdown yields 12 lectures and 10 linked quiz answers', async () => {
  const lectures = await parseLectures(await lectureFiles())
  const questions = parseQuiz(await quizText())
  assert.equal(lectures.length, 12)
  assert.equal(lectures[0].slug, '01-environment')
  assert.equal(lectures[0].day, 1)
  assert.equal(questions.length, 10)
  assert.ok(questions.every((question) => question.lesson))
})

test('invalid lecture and empty quiz are rejected', () => {
  assert.throws(() => parseLectureText('', 'bad.md'), /invalid lecture/)
  assert.throws(() => parseQuiz(''), /empty quiz/)
})
