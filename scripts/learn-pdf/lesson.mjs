import { examples } from './examples.mjs';
import { illustrate } from './illustrate.mjs';
import { mapping } from './gist-store.mjs';
import { render } from './markdown.mjs';
import { exampleHtml } from './example-html.mjs';
import { shortCode } from './short-code.mjs';
export async function lesson(browser, text, slug) {
  const replacements = new Map(), seen = new Set();
  for (const { name, token } of examples(text)) {
    const gist = mapping[slug];
    if (!gist?.files.includes(name)) throw Error(`Missing Gist: ${slug}/${name}`);
    const kind = ['html', 'css'].includes(token.info) ? 'web' : token.info;
    const picture = seen.has(kind) ? null : await illustrate(browser, token, text, `${slug}-${kind}`);
    seen.add(kind);
    replacements.set(token.content, exampleHtml(token, name, gist.url, picture));
  }
  return render(text, { code: token => replacements.get(token.content) || shortCode(token) });
}
