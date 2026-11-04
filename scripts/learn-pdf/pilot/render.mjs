import { readFile, mkdir } from 'node:fs/promises';
import { launch } from '../runtime.mjs';
import { prepare } from './prepare.mjs';
import { markup } from './markup.mjs';
import { output } from './output.mjs';
import { assets } from './assets.mjs';
const read = f => readFile(new URL(f, import.meta.url), 'utf8');
const out = process.argv[2];
if (!out || !out.includes('/T/opencode/')) throw Error('Temporary pilot output only');
await mkdir(out, { recursive: true });
const deck = await assets(JSON.parse(await read(process.argv[3] || 'step01.json')));
deck[0].label ||= deck[0].note?.replace(/^STEP \d+\s*·\s*/, '') || deck[0].title;
const browser = await launch();
try {
  const page = await prepare(browser, read);
  await page.evaluate(html => document.body.innerHTML = html,
    deck.map((s, i) => markup(s, i, deck.length)).join(''));
  await output(page, out, process.argv[3]?.match(/step(\d+)/)?.[1] || '01');
} finally { await browser.close(); }
