import fs from "fs";
import { execFileSync } from "child_process";
import { createMarkdown } from "./learn-pdf/markdown-shared.mjs";

const md = createMarkdown(), cnt = (s, p) => (s.match(p) || []).length;
const clr = s => s.replace(/<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>/g, "");

function chk(text, id) {
  const gh = execFileSync("gh", ["api", "/markdown", "-f", "mode=gfm", "-f", `text=${text}`], { encoding: "utf8" });
  const st = md.render(text);
  const gc = cnt(gh, /type="checkbox"/g), sc = cnt(st, /type="checkbox"/g);
  if (gc !== sc || (sc > 0 && cnt(st, /disabled/g) < sc) || cnt(gh, /<table/g) !== cnt(st, /<table/g)) throw new Error(`${id}: diff`);
  if (clr(st).includes("**") || clr(gh).includes("**")) throw new Error(`${id}: **`);
}

["05-remote.md", "appendix/04-mermaid.md", "appendix/05-os-differences.md"].forEach(f => chk(fs.readFileSync(`docs/lecture/${f}`, "utf8"), f));
chk("합성: <strong>(괄호)</strong>를 와 `code`는 및 **강조**를 비교. `**code**`", "syn");
console.log("GFM comparison test passed");
