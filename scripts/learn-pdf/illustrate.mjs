import { capture } from './capture.mjs';
import { demo } from './demo.mjs';
import { webPreview } from './web-preview.mjs';
import { render, escape } from './markdown.mjs';
import { evidence } from './evidence.mjs';
export async function illustrate(browser, token, text, key) {
  const lang = token.info.trim();
  let html, label;
  if (lang === 'html' || lang === 'css') {
    html = await webPreview(text);
    label = 'HTML/CSS 실제 브라우저 렌더 결과';
  } else if (lang === 'markdown') {
    html = render(token.content);
    label = 'Markdown 실제 렌더 결과';
  } else {
    html = `<h1>Git 실습 실행 결과</h1><pre>${escape(await demo(key.slice(0, 2)))}</pre>`;
    label = '격리된 실습 저장소의 실제 실행 출력 (원격 배포 화면 아님)';
  }
  return { image: await capture(browser, html, await evidence(key, html)), label };
}
