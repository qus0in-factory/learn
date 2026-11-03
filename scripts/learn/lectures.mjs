import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { LECTURE_DIR } from './paths.mjs'

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n/
const TITLE = /^# (.+)$/m
const DAY = /^day: (\d)$/m
const SCHEDULE = /^schedule: "(.+)"$/m

export function parseLectureText(text, file) {
  const meta = text.match(FRONTMATTER)?.[1] ?? ''
  const title = text.slice(meta ? text.indexOf('\n---\n', 4) : 0).match(TITLE)
  const day = meta.match(DAY)
  const schedule = meta.match(SCHEDULE)
  if (!title || !day || !schedule) throw new Error(`invalid lecture: ${file}`)
  return {
    slug: file.replace(/\.md$/, ''),
    position: Number(file.slice(0, 2)),
    day: Number(day[1]),
    title: title[1],
    schedule: schedule[1],
  }
}

export async function parseLecture(file) {
  return parseLectureText(await readFile(join(LECTURE_DIR, file), 'utf8'), file)
}

export function parseLectures(files) {
  return Promise.all(files.map(parseLecture))
}
