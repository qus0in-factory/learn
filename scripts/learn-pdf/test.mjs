import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { here, output } from './paths.mjs';
import { render } from './markdown.mjs';
const browser = await chromium.launch({ channel: process.env.PDF_BROWSER || 'chrome' });
try {
  const page = await browser.newPage();
  await page.addStyleTag({ path: here + 'style.css' });
  await page.addScriptTag({ path: output + '/renderer.js' });
  const html = render('# Test\n' + '- 항목\n'.repeat(40));
  const result = await page.evaluate(h => window.prepare(h), html);
  assert(result.pages > 2);
  await page.evaluate(() => document.body.replaceChildren());
  await assert.rejects(page.evaluate(h => window.prepare(h),
    render('# Too large\n\n```text\n' + '한글 '.repeat(4000) + '\n```')),
  /Oversized/);
  console.log('pagination and overflow rejection PASS');
} finally { await browser.close(); }
