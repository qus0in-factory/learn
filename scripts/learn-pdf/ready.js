import mermaid from 'mermaid';
export async function ready(source) {
  mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'neutral',
    fontFamily: 'Learn Sans' });
  await mermaid.run({ nodes: source.querySelectorAll('.mermaid') });
  await Promise.all([...source.querySelectorAll('img')].map(img => img.decode()));
  await document.fonts.ready;
}
