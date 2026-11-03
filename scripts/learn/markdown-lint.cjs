const md = require('markdown-it')({ html: true });
const strip = s => s.replace(/(`+)([\s\S]*?)\1/g, m => m.replace(/[^\n]/g, ' '));
const nl = (s, b) => (s.slice(0, b ? s.indexOf(b) : undefined).match(/\n/g) || []).length;

function detectLiterals(c) {
  const is = [];
  for (const t of md.parse(c, {})) {
    if (t.type !== 'inline' || !t.content.includes('**')) continue;
    const l0 = (t.map?.[0] || 0) + 1, s = strip(t.content);
    const re = /\*\*([^\s*]+?\.)\*\*~(?=[\w가-힣])/g; let m;
    while ((m = re.exec(s))) is.push({ line: l0 + nl(s.slice(0, m.index)), text: m[0] });
    const cl = s.replace(/\\\*|[\w\-./]\/\*\*/g, '').match(/\*\*/g);
    if (!cl || cl.length < 2) continue;
    let cur = l0;
    for (const ch of t.children) {
      if (ch.type === 'softbreak') cur++;
      else if (ch.type === 'text' && ch.content.includes('**')) {
        is.push({ line: cur + nl(ch.content, '**'), text: ch.content }); cur += nl(ch.content);
      }
    }
  }
  return is;
}

module.exports = { detectLiterals };
