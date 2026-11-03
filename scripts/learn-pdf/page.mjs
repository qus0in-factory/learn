import { resolve } from 'node:path';
import { here } from './paths.mjs';
export async function createPage(browser, bundle, title) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  for (const file of ['style.css', 'theme.css', 'images.css']) {
    await page.addStyleTag({ path: resolve(here, file) });
  }
  await page.addScriptTag({ path: bundle });
  await page.evaluate(title => { document.title = title; }, title);
  return page;
}
