import { readFileSync } from 'node:fs';
const { base } = JSON.parse(readFileSync(new URL('./site-links.json', import.meta.url)));
export function siteLinks(md) {
  const previous = md.renderer.rules.link_open;
  md.renderer.rules.link_open = (tokens, i, options, env, self) => {
    const token = tokens[i];
    const href = token.attrGet('href');
    if (/^(?![a-z]+:|\/|#)[^?#]+\.md(?:[?#]|$)/i.test(href)) {
      token.attrSet('href', new URL(href.replace(/\.md(?=[?#]|$)/, ''), base).href);
    }
    return previous ? previous(tokens, i, options, env, self) : self.renderToken(tokens, i, options);
  };
}
