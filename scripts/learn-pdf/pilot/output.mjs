import { audit } from './audit.mjs';
export async function output(page, out, id = '01') {
  console.log('Pinned fonts:', await audit(page));
  await page.pdf({ path: `${out}/${id}.pdf`, preferCSSPageSize: true, printBackground: true });
  for (const [i, slide] of (await page.locator('.deck').all()).entries())
    await slide.screenshot({ path: `${out}/${id}-p${String(i+1).padStart(2,'0')}.png` });
}
