import { readFile } from 'node:fs/promises';
export async function subject(deck) {
  const read = f => readFile(new URL(f, import.meta.url), 'utf8');
  const subjects = JSON.parse(await read('subjects.json'));
  const id = deck[0].step?.match(/\d+/)?.[0] || '01';
  const [title, icon] = subjects[id];
  const svg = await read(`assets/subject-${id}.svg`);
  for (const s of deck) {
    if (s.type === 'cover') s.title = title;
    if (s.type === 'cover' || s.type === 'eof') s.subjectSvg = svg;
  }
}
