import MarkdownIt from 'markdown-it';
import cjkFriendly from 'markdown-it-cjk-friendly';
import taskLists from 'markdown-it-task-lists';
import footnote from 'markdown-it-footnote';
import githubAlerts from 'markdown-it-github-alerts';

export function configureMarkdown(md, opts = {}) {
  md.use(cjkFriendly);
  md.use(taskLists, { enabled: false });
  md.use(footnote);
  md.use(githubAlerts);
  if (opts.mermaid) {
    const prev = md.renderer.rules.fence;
    md.renderer.rules.fence = (t, i, o, e, s) => {
      if (t[i].info.trim() === 'mermaid') return opts.mermaid(t[i].content);
      return prev ? prev(t, i, o, e, s) : `<pre><code>${md.utils.escapeHtml(t[i].content)}</code></pre>`;
    };
  }
  return md;
}

export function createMarkdown(opts = {}) {
  const md = new MarkdownIt({ html: true, linkify: true, ...opts });
  return configureMarkdown(md, opts);
}
