import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { lectureFiles, ROOT } from './paths.mjs'
import { pdfUrl } from '../../learn-site/.vitepress/pdf-url.mjs'

test('README lists the same revision URLs as the source', async () => {
  const readme = await readFile(join(ROOT, 'README.md'), 'utf8')
  const links = [...readme.matchAll(/https:\/\/files\.qus0in\.dev\/v0\.1\.0\/[\w-]+\.pdf[^\s)]*/g)].map((m) => m[0])
  const topics = (await lectureFiles()).map((file) => file.replace(/\.md$/, ''))
  assert.equal(links.length, 12)
  for (const topic of topics) assert.ok(links.includes(pdfUrl(`${topic}.pdf`)), topic)
})
