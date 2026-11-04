import { auditFonts } from '../font-audit.mjs';
import { geometry } from './geometry.mjs';
import { presentationAudit } from './presentation-audit.mjs';
import { bounds } from './bounds.mjs';
import { overlap } from './overlap.mjs';
export async function audit(page) {
  const fonts = await auditFonts(page);
  const issues = await bounds(page);
  issues.push(...await geometry(page));
  issues.push(...await presentationAudit(page));
  issues.push(...await overlap(page));
  if (issues.length) throw Error(JSON.stringify(issues));
  return fonts;
}
