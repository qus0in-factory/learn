// 제목·표·HTML·코드·링크·굵은 글씨 밖에서 용어 첫 등장을 찾는다.
export const skipLine = raw => /^(#|\s*[|<]|\s*(```|~~~))/.test(raw);
const mask = s => s.replace(/`[^`]*`|\[[^\]]*\]\([^)]*\)|\*\*[^*]*\*\*/g, m => " ".repeat(m.length));
/** term·aliases 중 가장 앞의 [위치, 표기] 또는 null */
export function findTerm(raw, term, aliases = []) {
  const masked = mask(raw);
  let best = null;
  for (const text of [term, ...aliases]) {
    const at = masked.indexOf(text);
    if (at >= 0 && (!best || at < best[0])) best = [at, text];
  }
  return best;
}
/** frontmatter·코드 블록 밖 본문 줄 인덱스 */
export function* proseIndexes(L) {
  let code = false, fm = L[0] === "---";
  for (let i = 0; i < L.length; i++) {
    if (fm) { fm = !(i && L[i] === "---"); continue; }
    if (/^\s*(```|~~~)/.test(L[i])) { code = !code; continue; }
    if (!code && !skipLine(L[i])) yield i;
  }
}
