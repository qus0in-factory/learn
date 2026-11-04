import fs from "node:fs";
import { R, checkLine } from "./content-lint-check.mjs";
import { repeatedEndings } from "./content-lint-runs.mjs";
const md = a => fs.statSync(a).isDirectory()
  ? fs.readdirSync(a, { recursive: true }).filter(f => f.endsWith(".md")).map(f => a + "/" + f) : [a];
let n = 0;
for (const f of process.argv.slice(2).flatMap(md)) {
  if (R.ignore.some(x => f.endsWith(x))) continue;
  const L = fs.readFileSync(f, "utf8").split("\n");
  let code = false, fm = L[0] === "---";
  L.forEach((raw, i) => {
    if (fm) return void (fm = !(i && raw === "---"));
    if (/^\s*(```|~~~)/.test(raw)) return void (code = !code);
    if (code) return;
    for (const [m, s] of checkLine(raw)) { console.error(`${f}:${i + 1}: ${m}: ${s.trim()}`); n++; }
  });
  repeatedEndings(L).forEach(w => console.error(`${f}:${w}`));
}
if (n) { console.error(`content-lint: ${n} issue(s)`); process.exit(1); }
console.log("content-lint: ok");
