import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { output } from './paths.mjs';
import { summary } from './summary.mjs';
import { createPage } from './page.mjs';
import { inspect } from './inspect.mjs';
import { auditFonts } from './font-audit.mjs';
export async function exportLesson(browser, file, bundle) {
  const name = file.split('/').at(-1).replace('.md', '');
  const raw = await readFile(file, 'utf8');
  const html = summary(raw, name);
  const title = `STEP ${name.slice(0, 2)} ${raw.match(/^# (.+)$/m)[1]}`;
  const page = await createPage(browser, bundle, title);
  const result = await page.evaluate(html => window.prepare(html), html);
  Object.assign(result, await inspect(page, title));
  result.fonts = await auditFonts(page);
  await page.pdf({ path: resolve(output, `${name}.pdf`),
    preferCSSPageSize: true, printBackground: true });
  await page.close();
  console.log(name, result);
  return { name, title, ...result };
}
