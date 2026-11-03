import MarkdownIt from 'markdown-it';
import { extensions, kinds } from './example-names.mjs';
const md = new MarkdownIt();
export const fences = text => md.parse(text, {}).filter(t => t.type === 'fence');
export function commands(token) {
  return token.content.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
}
export function external(token) {
  const lang = token.info.trim();
  if (lang === 'mermaid') return false;
  if (lang === 'bash') return commands(token).length > 3;
  return lang !== 'text' || token.content.trim().split('\n').length > 3;
}
export function examples(text) {
  const count = {};
  return fences(text).filter(external).map(token => {
    const lang = token.info.trim();
    const ext = extensions[lang];
    if (!ext) throw Error(`Unsupported example: ${lang}`);
    count[ext] = (count[ext] || 0) + 1;
    return { name: `${kinds[ext]}-${count[ext]}.${ext}`, token };
  });
}
