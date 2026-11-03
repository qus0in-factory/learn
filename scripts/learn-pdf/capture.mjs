export async function capture(browser, html, path) {
  const page = await browser.newPage({ viewport: { width: 1060, height: 430 } });
  try {
    await page.route('**/*', route => route.abort());
    await page.setContent(html);
    await page.addStyleTag({ content: `body { margin: 28px; color: #172b46;
      font: 22px/1.5 "Apple SD Gothic Neo", sans-serif; background: #f7f9fa; }
      pre { padding: 24px; background: #172b46; color: white; font: 24px/1.5 Menlo; }
      h1 { font-size: 32px; } h2 { font-size: 25px; }` });
    await page.evaluate(() => document.fonts.ready);
    const image = await page.screenshot({ fullPage: true, path });
    return `data:image/png;base64,${image.toString('base64')}`;
  } finally { await page.close(); }
}
