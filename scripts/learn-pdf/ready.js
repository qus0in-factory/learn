import mermaid from 'mermaid';
export async function ready(source) {
  mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'neutral',
    fontFamily: 'Learn Sans', themeVariables: { fontSize: '30px',
      lineColor: '#172b46' }, flowchart: { useMaxWidth: false } });
  await mermaid.run({ nodes: source.querySelectorAll('.mermaid') });
  await Promise.all([...source.querySelectorAll('img')].map(img => img.decode()));
  await document.fonts.ready;
}
