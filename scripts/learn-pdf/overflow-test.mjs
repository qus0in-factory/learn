import assert from 'node:assert/strict';
import { render } from './markdown.mjs';
export async function overflowTest(page) {
  const html = render('# Test\n' + '- 항목\n'.repeat(40));
  const result = await page.evaluate(h => window.prepare(h), html);
  assert(result.pages > 2);
  await page.evaluate(() => document.body.replaceChildren());
  await assert.rejects(page.evaluate(h => window.prepare(h),
    render('# Too large\n\n```text\n' + '한글 '.repeat(4000) + '\n```')),
  /Oversized/);
}
