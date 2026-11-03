import { commands } from './examples.mjs';
import { escape } from './markdown.mjs';
export function shortCode(token) {
  if (token.info === 'bash') {
    return `<pre><code>${escape(commands(token).slice(0, 3).join('\n'))}</code></pre>`;
  }
  return `<blockquote>${escape(token.content.trim()).replaceAll('\n', '<br>')}</blockquote>`;
}
