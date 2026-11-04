import { readFile } from 'node:fs/promises';
export async function contract(deck) {
  const subjects = JSON.parse(await readFile(new URL('subjects.json', import.meta.url), 'utf8'));
  const id = deck[0]?.step?.match(/\d+/)?.[0] || '01';
  if (deck.length < 12 || deck.length > 15) throw Error('Deck requires 12–15 slides');
  if (deck[0].title !== subjects[id][0] || deck.at(-1).title !== '- EOF -')
    throw Error('Canonical cover title and EOF required');
  for (const s of deck) {
    if (['label', 'text', 'note'].some(k => k in s)) throw Error('Move auxiliary text into body');
    if (/^다음[:：]/.test(s.title)) throw Error('Use a factual section title');
  }
  const visuals = deck.filter(s => s.diagram || s.image).length;
  if (visuals < 1 || visuals > 3) throw Error('Deck requires 1–3 conceptual visuals');
}
