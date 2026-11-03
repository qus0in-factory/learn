import { shortCode } from './short-code.mjs';
export function exampleHtml(token, name, url, picture) {
  const link = `<p><a href="${url}#file-${name.replaceAll('.', '-')}">전체 예제 코드 · ${name}</a></p>`;
  const summary = token.info === 'bash' ? shortCode(token) : '';
  const result = picture ? `<figure><img alt="${picture.label}" src="${picture.image}">
    <figcaption>${picture.label}</figcaption></figure>` : '';
  return summary + result + link;
}
