import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = fileURLToPath(new URL('../../', import.meta.url))
export const LECTURE_DIR = join(ROOT, 'docs/lecture')

export async function lectureFiles() {
  const names = await readdir(LECTURE_DIR)
  return names.filter((name) => /^\d{2}-[\w-]+\.md$/.test(name)).sort()
}
