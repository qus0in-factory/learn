import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { LECTURE_DIR } from './paths.mjs'

const TITLE = /^# \d+차시\. (.+)$/
const SCHEDULE = /^Day (\d) · (.+)$/

export function parseLectureText(text, file) {
  const lines = text.split('\n')
  const title = lines.map((line) => line.match(TITLE)).find(Boolean)
  const schedule = lines.map((line) => line.trim().match(SCHEDULE)).find(Boolean)
  if (!title || !schedule) throw new Error(`invalid lecture: ${file}`)
  return {
    slug: file.replace(/\.md$/, ''),
    position: Number(file.slice(0, 2)),
    day: Number(schedule[1]),
    title: title[1],
    schedule: schedule[2],
  }
}

export async function parseLecture(file) {
  return parseLectureText(await readFile(join(LECTURE_DIR, file), 'utf8'), file)
}

export function parseLectures(files) {
  return Promise.all(files.map(parseLecture))
}
