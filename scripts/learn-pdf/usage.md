# Learn 슬라이드 PDF

저장소 루트에서 `bash scripts/build-learn-pdfs.sh`를 실행한다.
Node.js/npm, Python 3, Chrome, Poppler(`pdftotext`, `pdftoppm`)가 필요하다.
기본 브라우저 채널은 `chrome`; Chromium 설치 환경은 `PDF_BROWSER=chromium`을 지정한다.
한글 폰트는 macOS의 Apple SD Gothic Neo 또는 Linux의 Noto Sans CJK KR을 사용한다.

입력은 `docs/lecture/01-*.md`부터 `12-*.md`까지다. 기존 slides/는 사용하지 않는다.
출력은 git에서 제외된 `dist/learn-pdfs/`: PDF 12개, 페이지수·대표 페이지 manifest,
추출 텍스트, 대표 페이지 PNG, 번들이다. R2에는 PDF만 업로드한다.

섹션별 새 장, 목록 항목·표 행·12줄 코드 묶음별 분절을 적용한다.
내용 보존·DOM 경계·넘침 거부 회귀 검사 후 PDF 전 페이지의 16:9 크기,
페이지수, 추출 텍스트와 단어 좌표를 검사한다. PNG는 표지·코드·Mermaid·최대 텍스트 장을 생성한다.
PNG 육안 확인은 별도로 수행하며, PDF 크기는 960×540pt(1280×720 CSS px)다.
