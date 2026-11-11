import { readFile } from 'node:fs/promises'

// Easy decks reuse one existing subject icon for cover and eof slides.
export async function subject(deck) {
  const svg = await readFile(new URL('../learn-pdf/pilot/assets/subject-01.svg', import.meta.url), 'utf8')
  for (const s of deck) {
    if (s.type === 'cover') s.title = s.title
    if (s.type === 'cover' || s.type === 'eof') s.subjectSvg = svg
  }
}
