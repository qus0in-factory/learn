import { render, escape } from './markdown.mjs';
import { summaryParts } from './summary-parts.mjs';
export function summary(raw, name) {
  const subtitle = raw.match(/^subtitle: "(.*)"$/m)?.[1];
  return summaryParts(raw, name).map(({ title, level, link, body }) => {
    const heading = `${level === 1 ? `STEP ${name.slice(0, 2)} ` : ''}${title}`;
    return `<h${level} data-reference="${escape(link)}">${escape(heading)}</h${level}>`
      + (level === 1 && subtitle ? `<p>${escape(subtitle)}</p>` : '') + render(body);
  }).join('\n');
}
