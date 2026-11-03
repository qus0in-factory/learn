import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { output } from './paths.mjs';
import { lesson } from './lesson.mjs';
import { createPage } from './page.mjs';
import { inspect } from './inspect.mjs';
import { auditFonts } from './font-audit.mjs';
export async function exportLesson(browser, file, bundle) {
  const text = await readFile(file, 'utf8');
  const title = text.split('\n')[0].replace(/^# (\d+)차시\./, '$1.');
  const page = await createPage(browser, bundle, title);
  const name = file.split('/').at(-1).replace('.md', '');
  const result = await page.evaluate(html => window.prepare(html),
    await lesson(browser, text, name));
  Object.assign(result, await inspect(page, title));
  result.fonts = await auditFonts(page);
  await page.pdf({ path: resolve(output, `${name}.pdf`),
    preferCSSPageSize: true, printBackground: true });
  await page.close();
  console.log(name, result);
  return { name, title, ...result };
}
