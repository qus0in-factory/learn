const fs = require('fs'), path = require('path');
const { detectLiterals } = require('./learn/markdown-lint.cjs');

const find = d => !fs.existsSync(d) ? [] : fs.statSync(d).isFile() ? [d] :
  fs.readdirSync(d).flatMap(n => {
    const p = path.join(d, n);
    return fs.statSync(p).isDirectory() && !/^(node_modules|\.git|dist)$/.test(n) ? find(p) : (p.endsWith('.md') ? [p] : []);
  });

let total = 0;
const targets = process.argv.slice(2);
for (const target of (targets.length ? targets : ['docs/lecture', 'README.md'])) {
  for (const file of find(target)) {
    const issues = detectLiterals(fs.readFileSync(file, 'utf8'));
    for (const issue of issues) {
      console.error(`${file}:${issue.line}: ${issue.text}`);
      total++;
    }
  }
}
if (total > 0) {
  console.error(`Found ${total} markdown literal issues.`);
  process.exit(1);
}
console.log('lint-korean-markdown: all files clean.');
