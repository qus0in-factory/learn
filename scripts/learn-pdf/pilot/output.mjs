import { auditFonts } from '../font-audit.mjs';
import { geometry } from './geometry.mjs';
import { presentationAudit } from './presentation-audit.mjs';
import { bounds } from './bounds.mjs';
import { overlap } from './overlap.mjs';
export async function output(page, out, id = '01') {
  console.log('Pinned fonts:', await auditFonts(page));
  const issues = await bounds(page);
  issues.push(...await geometry(page));
  issues.push(...await presentationAudit(page));
  issues.push(...await overlap(page));
  if (issues.length) throw Error(JSON.stringify(issues));
  await page.pdf({ path: `${out}/${id}.pdf`, preferCSSPageSize: true, printBackground: true });
  for (const [i, slide] of (await page.locator('.deck').all()).entries())
    await slide.screenshot({ path: `${out}/${id}-p${String(i+1).padStart(2,'0')}.png` });
}
