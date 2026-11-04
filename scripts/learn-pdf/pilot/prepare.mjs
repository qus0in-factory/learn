import { fonts } from '../fonts.mjs';
import { tokens } from './tokens.mjs';
export async function prepare(browser, read) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.setContent('<h1></h1><pre></pre><footer></footer>');
  await page.addStyleTag({ content: await read('../theme.css') });
  await tokens(page);
  await fonts(page);
  for (const file of ['layout.css', 'blocks.css', 'projection.css'])
    await page.addStyleTag({ content: await read(file) });
  return page;
}
