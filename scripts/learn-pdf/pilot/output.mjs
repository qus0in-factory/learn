import { auditFonts } from '../font-audit.mjs';
import { geometry } from './geometry.mjs';
export async function output(page, out, id = '01') {
  console.log('Pinned fonts:', await auditFonts(page));
  const issues = await page.locator('.deck').evaluateAll(slides => slides.flatMap((s,i) =>
    [...s.querySelectorAll('h1,p,.card,table,pre')].filter(e => {
      const a=e.getBoundingClientRect(), b=s.getBoundingClientRect();
      return a.right>b.right-40 || a.bottom>b.bottom-55 || e.scrollWidth>e.clientWidth+1;
    }).map(e => ({page:i+1,text:e.textContent}))));
  issues.push(...await geometry(page));
  if (issues.length) throw Error(JSON.stringify(issues));
  await page.pdf({ path: `${out}/${id}.pdf`, preferCSSPageSize: true, printBackground: true });
  for (const [i, slide] of (await page.locator('.deck').all()).entries())
    await slide.screenshot({ path: `${out}/${id}-p${String(i+1).padStart(2,'0')}.png` });
}
