// Site-only markup is dropped before slide rendering: frontmatter, image-request
// fences, Vue component lines and ::quiz:: markers. The H1 gets its STEP label and
// the frontmatter subtitle becomes the cover line under it.
const FRONTMATTER = /^---\n([\s\S]*?)\n---\n/;
const IMAGE_REQUEST = /^```image-request\n[\s\S]*?\n```\n?/gm;
const COMPONENT = /^<[A-Z][\w]* ?\/>\n?/gm;
const QUIZ = /::([^:\n]+)::/g;
export function stepLabel(name) {
  return `STEP ${name.slice(0, 2)}`;
}
export function prepareSource(raw, name) {
  const subtitle = raw.match(FRONTMATTER)?.[1].match(/^subtitle: "(.+)"$/m)?.[1] || '';
  const text = raw.replace(FRONTMATTER, '').replace(IMAGE_REQUEST, '').replace(COMPONENT, '')
    .replace(QUIZ, '<u>$1</u>');
  return text.replace(/^# (.+)$/m, (m, title) => `# ${stepLabel(name)} ${title}\n\n${subtitle}`);
}
