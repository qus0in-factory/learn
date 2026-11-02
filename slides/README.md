# 수업 슬라이드

Node.js 설치 후 `npm install`, `npm run dev`로 편집·발표한다. `npm run build`는 공유용 정적 파일을 `dist`에 만든다. 공개 빌드는 발표자 노트를 제외한다. PDF는 Playwright 설치 후 `npm run export`로 생성할 수 있다.

Cloudflare Pages에서 이 폴더를 루트로 지정하고 빌드 명령 `npm run build`, 출력 디렉터리 `dist`를 사용한다. 하위 경로에 배포한다면 Slidev의 `--base` 설정이 필요하다.
