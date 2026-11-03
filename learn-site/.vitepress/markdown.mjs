import { render } from 'pele';
import { configureMarkdown } from '../../scripts/learn-pdf/markdown-shared.mjs';

export const markdown = {
  config(md) {
    configureMarkdown(md, {
      mermaid: c => `<div class="mermaid-diagram">${render(c).svg}</div>\n`
    });
  }
};
