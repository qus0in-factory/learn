import { readFile } from 'node:fs/promises';
import { assets } from './assets.mjs';
import { prepare } from './prepare.mjs';
import { markup } from './markup.mjs';
export async function deckPage(browser, file) {
  const read = f => readFile(new URL(f, import.meta.url), 'utf8');
  const deck = await assets(JSON.parse(await read(file)));
  const page = await prepare(browser, read);
  await page.evaluate(html => document.body.innerHTML = html,
    deck.map((s, i) => markup(s, i, deck.length)).join(''));
  return { page, deck };
}
