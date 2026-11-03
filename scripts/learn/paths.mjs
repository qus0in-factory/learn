import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const ROOT = new URL('../../', import.meta.url).pathname
export const LECTURE_DIR = join(ROOT, 'docs/lecture')
const PDF_CONFIG = join(ROOT, 'learn-site/.vitepress/pdf.mjs')

export async function lectureFiles() {
  const names = await readdir(LECTURE_DIR)
  return names.filter((name) => /^\d{2}-[\w-]+\.md$/.test(name)).sort()
}

export async function pdfRoot() {
  const text = await readFile(PDF_CONFIG, 'utf8')
  const match = text.match(/const root = '([^']+)'/)
  if (!match) throw new Error('pdf root not found in learn-site/.vitepress/pdf.mjs')
  return match[1]
}
