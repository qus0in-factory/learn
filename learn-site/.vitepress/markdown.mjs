import { render } from 'pele';
import { configureMarkdown } from '../../scripts/learn-pdf/markdown-shared.mjs';
import { displayMarkdown, displayText } from './display-text.mjs';
import { labels } from './labels.mjs';

export const markdown = {
  codeCopyButtonTitle: labels.copyCode,
  config(md) {
    configureMarkdown(md, {
      mermaid: c => `<div class="mermaid-diagram">${render(displayText(c)).svg}</div>\n`
    });
    displayMarkdown(md);
    const link = md.renderer.rules.link_open;
    md.renderer.rules.link_open = (tokens, i, options, env, self) => {
      const token = tokens[i];
      if (token.attrGet('class')?.includes('header-anchor')) {
        const title = token.attrGet('aria-label')?.replace(/^Permalink to /, '') || '';
        token.attrSet('aria-label', `${labels.permalink}: ${displayText(title)}`);
      }
      return link ? link(tokens, i, options, env, self) : self.renderToken(tokens, i, options);
    };
  }
};
