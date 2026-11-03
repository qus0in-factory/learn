import assert from 'node:assert/strict';
import { launch } from './runtime.mjs';
import { fonts } from './fonts.mjs';
import { auditFonts } from './font-audit.mjs';
process.env.PDF_BROWSER = 'chrome';
await assert.rejects(launch(), /overrides are forbidden/);
delete process.env.PDF_BROWSER;
const browser = await launch();
try {
  const page = await browser.newPage();
  await page.setContent('<p>Fallback</p>');
  await assert.rejects(auditFonts(page), /System font fallback/);
  await fonts(page);
  await page.addStyleTag({ content: 'body {font-family:"Learn Sans"}' });
  assert((await auditFonts(page)).length);
} finally { await browser.close(); }
console.log('browser override and font fallback rejection PASS');
