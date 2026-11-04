import { output } from '../paths.mjs';
import { deckPage } from './page.mjs';
import { audit } from './audit.mjs';
export async function exportDeck(browser, name) {
  const { page, deck } = await deckPage(browser, `step${name.slice(0, 2)}.json`);
  try {
    const title = `${deck[0].step} ${deck[0].title}`;
    await page.evaluate(t => document.title = t, title);
    const fonts = await audit(page);
    await page.pdf({ path: `${output}/${name}.pdf`,
      preferCSSPageSize: true, printBackground: true });
    const pages = deck.length;
    const samples = [...new Set([1, 4, Math.ceil(pages / 2), pages])];
    console.log(name, pages, fonts);
    return { name, title, pages, samples, fonts };
  } finally { await page.close(); }
}
