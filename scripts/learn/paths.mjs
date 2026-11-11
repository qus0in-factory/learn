import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = fileURLToPath(new URL('../../', import.meta.url))
export const LECTURE_DIR = join(ROOT, 'docs/lecture')
export const EASY_DIR = join(ROOT, 'docs/easy')
export const QUIZ_SOURCE = join(ROOT, 'data/learn-quiz.md')

export async function lectureFiles() {
  const names = await readdir(LECTURE_DIR)
  return names.filter((name) => /^\d{2}-[\w-]+\.md$/.test(name)).sort()
}

export async function easyPracticeFiles() {
  const res = []
  for (const g of ['github-practice', 'git-practice']) {
    const list = await readdir(join(EASY_DIR, g))
    for (const f of list.filter((n) => n.endsWith('.md')).sort()) res.push(`${g}/${f}`)
  }
  return res
}
