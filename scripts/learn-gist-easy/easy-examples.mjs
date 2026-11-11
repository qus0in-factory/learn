import { fences } from '../learn-pdf/examples.mjs';
import { extensions, kinds } from '../learn-pdf/example-names.mjs';

export function easyExamples(text) {
  const all = fences(text);
  const bash = all.filter(t => t.info.trim() === 'bash');
  const res = [];
  if (bash.length) {
    const content = bash.map(t => t.content.trim()).filter(Boolean).join('\n\n') + '\n';
    if (content.trim()) res.push({ name: 'git-commands.sh', token: { content } });
  }
  for (const token of all.filter(t => ['markdown', 'html', 'css'].includes(t.info.trim()))) {
    const ext = extensions[token.info.trim()];
    res.push({ name: `${kinds[ext]}.${ext}`, token });
  }
  return res;
}
