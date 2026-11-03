import assert from 'node:assert/strict';
export async function layoutTest(page) {
  await page.evaluate(() => document.body.replaceChildren());
  const lines = ['main {', ...Array(6).fill('  color: blue;'), '}', '',
    'next {', ...Array(8).fill('  margin: 0;'), '}'];
  await page.evaluate(h => window.prepare(h), `<h1>Code</h1><pre>${lines.join('\n')}</pre>`);
  const first = await page.locator('pre').first().textContent();
  assert.equal(first.trim().split('\n').at(-1), '}');
  await page.evaluate(() => document.body.replaceChildren());
  const result = await page.evaluate(h => window.prepare(h),
    '<h1>A</h1><p>Short A</p><h2>B</h2><p>Short B</p>');
  assert.equal(result.pages, 1);
  assert.equal(await page.locator('.content h2').textContent(), 'B');
}
