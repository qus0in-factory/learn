import fs from "node:fs";
import { findTerm, proseIndexes } from "./glossary-links-text.mjs";
// glossary.json firstLinks대로 STEP 본문의 용어 첫 등장을 사전 링크로 바꾼다(멱등).
const dir = "docs/lecture/", G = JSON.parse(fs.readFileSync(dir + "glossary.json", "utf8"));
const terms = Object.fromEntries(G.terms.map(t => [t.slug, t]));
for (const [step, slugs] of Object.entries(G.firstLinks || {})) {
  const file = `${dir}${step}.md`, L = fs.readFileSync(file, "utf8").split("\n");
  let done = 0;
  for (const slug of slugs) {
    const t = terms[slug], target = `](glossary.md#${slug})`;
    if (!t || L.some(l => l.includes(target))) continue;
    for (const i of proseIndexes(L)) {
      const hit = findTerm(L[i], t.term, t.aliases);
      if (!hit) continue;
      const [at, text] = hit;
      L[i] = L[i].slice(0, at) + `[${text}]` + target.slice(1) + L[i].slice(at + text.length); done++; break;
    }
  }
  fs.writeFileSync(file, L.join("\n")); console.log(step, done);
}
