import fs from "fs";
import { execFileSync } from "child_process";
import { createMarkdown } from "./learn-pdf/markdown-shared.mjs";

const md = createMarkdown(), c = (s, p) => (s.match(p) || []).length;
const clr = s => s.replace(/<(pre|code)[\s\S]*?<\/\1>/g, "");
const gh = t => execFileSync("gh", ["api", "/markdown", "-f", "mode=gfm", "-f", `text=${t}`], { encoding: "utf8" });

function chk(t, id) {
  const g = gh(t), s = md.render(t), gc = c(g, /type="checkbox"/g), sc = c(s, /type="checkbox"/g);
  if (gc !== sc || (sc && c(s, /disabled/g) < sc) || c(g, /<table/g) !== c(s, /<table/g)) throw Error(id);
  if ((clr(s) + clr(g)).includes("**")) throw Error(`${id}: **`);
}

["05-remote", "appendix/04-mermaid", "appendix/05-os-differences"].forEach(f => chk(fs.readFileSync(`docs/lecture/${f}.md`, "utf8"), f));
chk("합성: <strong>(괄호)</strong> `c` **강조** <strong>foo.</strong>~bar `**c**`", "syn");
if (!gh("**foo.**~bar").includes("**foo.**~bar")) throw Error("boundary");
console.log("GFM comparison test passed");
