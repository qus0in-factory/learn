export async function auditFonts(page) {
  const session = await page.context().newCDPSession(page);
  try {
    await session.send('DOM.enable');
    await session.send('CSS.enable');
    const { root } = await session.send('DOM.getDocument');
    const { nodeIds } = await session.send('DOM.querySelectorAll', {
      nodeId: root.nodeId, selector: 'body *',
    });
    const names = new Set();
    for (const nodeId of nodeIds) {
      const { fonts } = await session.send('CSS.getPlatformFontsForNode', { nodeId });
      for (const font of fonts.filter(f => f.glyphCount)) {
        if (!font.isCustomFont) throw Error(`System font fallback: ${font.familyName}`);
        names.add(font.familyName);
      }
    }
    return [...names].sort();
  } finally { await session.detach(); }
}
