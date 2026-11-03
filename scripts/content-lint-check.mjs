import fs from "node:fs";
export const R = JSON.parse(fs.readFileSync(new URL("./content-lint.rules.json", import.meta.url)));
const bad = R.forbiddenTerms.map(t => new RegExp(t)), pol = new RegExp(R.politeEndings.join("|"));
// ㅂ니다·ㅂ니까(습니다·입니다 등): 앞 글자 종성이 ㅂ(17)일 때만 존댓말
const bnida = s => [...s.matchAll(/(.)니[다까][.!?:]?(\s|$)/g)].some(m => (m[1].charCodeAt(0) - 44032) % 28 === 17);
/** 한 줄을 검사해 [종류, 내용] 목록을 돌려준다. 코드 블록·frontmatter 판단은 호출자가 한다. */
export function checkLine(raw) {
  const out = [], s = raw.replace(/`[^`]*`/g, "").replace(/\]\([^)]*\)/g, "]");
  const h = /^##{1,2} (.*)/.exec(raw.replace(/`/g, ""));
  if (h && [...h[1].trim()].length > R.headingMax) out.push([`heading>${R.headingMax}`, h[1]]);
  if (bnida(s) || pol.test(s)) out.push(["polite", s]);
  bad.forEach((re, k) => re.test(s) && out.push([`forbidden ${R.forbiddenTerms[k]}`, s]));
  return out;
}
