import { R } from "./content-lint-check.mjs";
const tail = s => s.replace(/`[^`]*`|\*\*|<[^>]+>/g, "").trim().replace(/[.:]$/, "").slice(-2);
// Warning only: three or more list items in a row ending the same way (procedures and prohibitions are exempt).
export function repeatedEndings(lines) {
  const out = []; let run = [], section = "", code = false;
  const flush = () => {
    if (run.length >= 3 && !R.repeatExempt.includes(section)) out.push(`${run[0].line}: warn: ${run.length} list items in a row end with "${run[0].key}"`);
    run = [];
  };
  lines.forEach((raw, i) => {
    if (/^\s*```/.test(raw)) code = !code;
    if (code) return;
    if (raw.startsWith("## ")) { flush(); section = raw.slice(3).replace(/<[^>]+>/g, "").trim(); }
    const m = /^\s*(?:[-*]|\d+\.)\s+(.*[다.])$/.exec(raw);
    if (m) { const key = tail(m[1]); if (run.length && run[0].key !== key) flush(); run.push({ line: i + 1, key }); }
    else if (raw.trim() && !raw.startsWith("   ")) flush();
  });
  flush();
  return out;
}
