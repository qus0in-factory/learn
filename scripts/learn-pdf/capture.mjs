import { output, here } from './paths.mjs';
import { fonts } from './fonts.mjs';
import { auditFonts } from './font-audit.mjs';
export async function capture(browser, html, path) {
  const page = await browser.newPage({ viewport: { width: 1060, height: 430 } });
  try {
    await page.route('**/*', route => route.abort());
    await page.setContent(html);
    await fonts(page);
    if (await page.locator('.mermaid').count()) {
      await page.addScriptTag({ path: output + '/renderer.js' });
      await page.evaluate(() => window.preview(document.body));
    }
    await page.addStyleTag({ path: here + 'capture.css' });
    await page.evaluate(() => document.fonts.ready);
    await auditFonts(page);
    const image = await page.screenshot({ fullPage: true, path });
    return `data:image/png;base64,${image.toString('base64')}`;
  } finally { await page.close(); }
}
