# Learn 슬라이드 PDF

저장소 루트에서 `bash scripts/build-learn-pdfs.sh`를 실행한다.
Node.js/npm, Python 3, Chrome, Poppler(`pdftotext`, `pdftoppm`)가 필요하다.
기본 브라우저 채널은 `chrome`; Chromium 설치 환경은 `PDF_BROWSER=chromium`을 지정한다.
한글 폰트는 macOS의 Apple SD Gothic Neo 또는 Linux의 Noto Sans CJK KR을 사용한다.

입력은 `docs/lecture/01-*.md`부터 `12-*.md`까지다. 기존 slides/는 사용하지 않는다.
출력은 git에서 제외된 `dist/learn-pdfs/`: PDF 12개, 페이지수·대표 페이지 manifest,
추출 텍스트, 대표 페이지 PNG, 번들이다. R2에는 PDF만 업로드한다.

표는 넘칠 때만 헤더를 반복하며 고정 열 너비로 분절한다. 들어가는 인접 섹션은 합친다.
슬라이드 코드는 최대 3줄이다. 긴 예제는 Gist 링크와 실제 렌더/격리 Git 실행 화면으로 대체한다.
내용 보존·DOM 경계·넘침 거부 회귀 검사 후 PDF 전 페이지의 16:9 크기,
페이지수, 추출 텍스트와 단어 좌표를 검사한다. PNG는 표지·코드·Mermaid·최대 텍스트 장을 생성한다.
PNG 육안 확인은 별도로 수행하며, PDF 크기는 960×540pt(1280×720 CSS px)다.

PDF를 다시 만들면 `learn-site/.vitepress/pdf.json`의 `revision`을 갱신하고, README·learn-site·D1이 같은 URL을 쓰는지 테스트한다.

Gist 게시(별도 승인 필요): `node scripts/publish-learn-gists.mjs`.
`qus0in`의 secret Gist만 사용하며 `gists.json` 매핑과 설명 조회로 중복 생성을 방지한다.
secret은 인증 없는 URL 열람이 가능하므로 비밀 정보 저장소가 아니다. 원본 코드 변경 시 검증이 실패한다.
스크린샷·실행 HTML은 `dist/learn-pdfs/screenshots/`에 남는다. GitHub 원격 배포 화면이 아닌 로컬 실습 결과다.
검증 후 업로드(별도 승인 필요): `node scripts/upload-learn-pdfs.mjs`.
정확히 12개 PDF만 `--remote --content-type application/pdf`로 R2에 덮어쓴다.
