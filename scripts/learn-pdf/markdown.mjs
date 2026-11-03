import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({ html: true });
md.renderer.rules.fence = (tokens, i) => {
  const { info, content } = tokens[i];
  return info.trim() === 'mermaid'
    ? `<div class="mermaid">${md.utils.escapeHtml(content)}</div>`
    : `<pre><code>${md.utils.escapeHtml(content)}</code></pre>`;
};
export const render = text => md.render(text);
