import MarkdownIt from 'markdown-it';
import { configureMarkdown } from './markdown-shared.mjs';

const md = new MarkdownIt({ html: true, linkify: true });
configureMarkdown(md, {
  mermaid: c => `<div class="mermaid">${md.utils.escapeHtml(c)}</div>`
});

const fence = md.renderer.rules.fence;
md.renderer.rules.fence = (tokens, i, options, env, self) => {
  if (env.code && tokens[i].info.trim() !== 'mermaid') return env.code(tokens[i]);
  return fence(tokens, i, options, env, self);
};
export const render = (text, env = {}) => md.render(text, env);
export const escape = text => md.utils.escapeHtml(text);
export { md };
