import MarkdownIt from 'markdown-it';
import { configureMarkdown } from './markdown-shared.mjs';

const md = new MarkdownIt({ html: true, linkify: true });
configureMarkdown(md, {
  mermaid: c => `<div class="mermaid">${md.utils.escapeHtml(c)}</div>`
});

export const render = text => md.render(text);
export { md };
