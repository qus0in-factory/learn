import { displayText } from './display-text.mjs';
import { labels } from './labels.mjs';

// Heading permalink anchors get a localized aria-label.
export function anchorLabels(md) {
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
