import mermaid from 'mermaid';
import { paginate } from './paginate.js';
import { audit } from './audit.js';
import { sourceText, checkContent } from './content.js';
window.prepare = async html => {
  const source = document.createElement('main');
  source.innerHTML = html;
  source.style.width = '1152px';
  document.body.append(source);
  mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'neutral' });
  await mermaid.run({ nodes: source.querySelectorAll('.mermaid') });
  await document.fonts.ready;
  const diagrams = source.querySelectorAll('.mermaid svg').length;
  source.remove();
  const expected = sourceText(source);
  paginate(source);
  const pages = [...document.querySelectorAll('.slide')];
  checkContent(pages, expected);
  pages.forEach((page, i) => {
    const footer = document.createElement('footer');
    footer.textContent = `Git · ${i + 1} / ${pages.length}`;
    page.append(footer);
  });
  return { pages: pages.length, diagrams, samples: audit(pages) };
};
