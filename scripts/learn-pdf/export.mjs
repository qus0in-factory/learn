import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { here, output } from './paths.mjs';
import { render } from './markdown.mjs';
export async function exportLesson(browser, file, bundle) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.addStyleTag({ path: resolve(here, 'style.css') });
  await page.addStyleTag({ path: resolve(here, 'theme.css') });
  await page.addScriptTag({ path: bundle });
  const result = await page.evaluate(html => window.prepare(html),
    render(await readFile(file, 'utf8')));
  const name = file.split('/').at(-1).replace('.md', '');
  await page.pdf({ path: resolve(output, `${name}.pdf`),
    preferCSSPageSize: true, printBackground: true });
  await page.close();
  console.log(name, result);
  return { name, ...result };
}
