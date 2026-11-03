import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseQuiz } from './quiz.mjs'
const text = `## 문항
1. Q1
2. Q2
3. Q3
## 해설
| 번호 | 해설 | 다시 보기 |
| :---: | :--- | :--- |
| 1 | A | [8](../08-profile-records.md) · [9](../09-issues.md) |
| 2 | A | [5](../05-remote.md) |
| 3 | A | 없음 |`

test('keeps every lesson link and the first as representative', () => {
  const questions = parseQuiz(text)
  assert.deepEqual(questions[0].lessons, ['08-profile-records', '09-issues'])
  assert.equal(questions[0].lesson, '08-profile-records')
  assert.deepEqual(questions[1].lessons, ['05-remote'])
  assert.deepEqual(questions[2].lessons, [])
  assert.equal(questions[2].lesson, null)
})
