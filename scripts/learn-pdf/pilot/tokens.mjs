export async function tokens(page) {
  const values = await page.evaluate(() => {
    const style = tag => getComputedStyle(document.querySelector(tag));
    return [style('body').color, style('h1').color, style('pre').backgroundColor,
      style('footer').color];
  });
  await page.addStyleTag({ content: `:root {--ink:${values[0]};--brand:${values[1]};
    --soft:${values[2]};--muted:${values[3]};--paper:Canvas;}` });
}
