import { readFileSync } from 'node:fs'
import { sidebar } from './nav.mjs'
import { pdfUrl } from './pdf-url.mjs'

const gists = JSON.parse(readFileSync(new URL('../../scripts/learn-pdf/gists.json', import.meta.url)))
export const courseLessons = sidebar['/git/'][0].items.map((lesson) => {
  const slug = lesson.link.split('/').at(-1)
  return { ...lesson, pdf: pdfUrl(`${slug}.pdf`), gist: gists[slug]?.url || '' }
})
