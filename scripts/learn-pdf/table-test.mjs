import assert from 'node:assert/strict';
export async function tableTest(page) {
  for (const count of [3, 28]) {
    await page.evaluate(() => document.body.replaceChildren());
    const rows = '<tr><td>A</td><td>긴 열 내용</td></tr>'.repeat(count);
    await page.evaluate(h => window.prepare(h),
      `<h1>Table</h1><table><thead><tr><th>X</th><th>Y</th></tr></thead><tbody>${rows}</tbody></table>`);
    const result = await page.evaluate(() => [...document.querySelectorAll('table')]
      .map(t => ({ rows: t.tBodies[0].rows.length, heads: t.tHead.rows.length,
        width: t.rows[0].cells[0].getBoundingClientRect().width })));
    assert.equal(result.reduce((n, t) => n + t.rows, 0), count);
    assert(result.every(t => t.heads === 1 && t.width === result[0].width));
    assert.equal(result.length === 1, count === 3);
  }
}
