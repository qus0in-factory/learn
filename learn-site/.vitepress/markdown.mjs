import { render } from 'pele';
import { configureMarkdown } from '../../scripts/learn-pdf/markdown-shared.mjs';
import { displayMarkdown, displayText } from './display-text.mjs';
import { labels } from './labels.mjs';
import { anchorLabels } from './anchor-labels.mjs';
import { imageRequest } from './image-request.mjs';
import { quizBlank } from './quiz-blank.mjs';
import { appendixMarkdown } from './appendix-sections.mjs';

export const markdown = {
  codeCopyButtonTitle: labels.copyCode,
  config(md) {
    appendixMarkdown(md);
    configureMarkdown(md, {
      mermaid: c => `<div class="mermaid-diagram">${render(displayText(c)).svg}</div>\n`
    });
    displayMarkdown(md);
    imageRequest(md);
    quizBlank(md);
    anchorLabels(md);
  }
};
