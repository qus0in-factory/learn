import fs from "node:fs";
import { R, checkLine } from "./content-lint-check.mjs";
import { repeatedEndings } from "./content-lint-runs.mjs";
const md = a => fs.statSync(a).isDirectory()
  ? fs.readdirSync(a, { recursive: true }).filter(f => f.endsWith(".md")).map(f => a + "/" + f) : [a];
let n = 0;
const inlineOnly = /^\s*`[^`]+`[.,;:]?\s*$/;
for (const f of process.argv.slice(2).flatMap(md)) {
  if (R.ignore.some(x => f.endsWith(x))) continue;
  const L = fs.readFileSync(f, "utf8").split("\n");
  let code = false, fm = L[0] === "---", run = 0, runAt = 0;
  const closeRun = () => {
    if (run < R.inlineCodeRunMin) return;
    console.error(`${f}:${runAt}: inline-code-run: ${run} consecutive inline-only lines`);
    n++;
  };
  L.forEach((raw, i) => {
    if (fm) { fm = !(i && raw === "---"); run = 0; return; }
    if (/^\s*(```|~~~)/.test(raw)) { closeRun(); code = !code; run = 0; return; }
    if (code) { run = 0; return; }
    if (inlineOnly.test(raw)) { if (!run) runAt = i + 1; run++; }
    else { closeRun(); run = 0; }
    for (const [m, s] of checkLine(raw)) { console.error(`${f}:${i + 1}: ${m}: ${s.trim()}`); n++; }
  });
  closeRun();
  repeatedEndings(L).forEach(w => console.error(`${f}:${w}`));
}
if (n) { console.error(`content-lint: ${n} issue(s)`); process.exit(1); }
console.log("content-lint: ok");
