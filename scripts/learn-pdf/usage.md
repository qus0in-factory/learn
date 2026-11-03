# Learn 슬라이드 PDF

저장소 루트에서 `bash scripts/build-learn-pdfs.sh`를 실행한다.
Node.js/npm(검증 런타임 26.13.0 LTS), Python 3, Poppler(`pdftotext`, `pdftoppm`, `pdffonts`)가 필요하다.
Playwright 1.56.1의 번들 Chromium 141.0.7390.37만 사용한다. 시스템 브라우저 override는 실패한다.
`fonts/`에 고정한 OFL Noto Sans KR·Noto Sans Mono와 SHA256을 검증하고 CDP로 실제 사용 폰트를 검사한다.
시스템 폰트 fallback이 한 글자라도 감지되면 실패한다. OFL 원문과 upstream commit은 같은 디렉터리에 있다.
`toolchain.json`은 브라우저·폰트·의존성 lock·Node·OS 버전을 기록한다.
`node scripts/learn-pdf/font-test.mjs`는 브라우저 override와 폰트 fallback 거부를 검증한다.

두 환경 비교: dev의 `PDF reproducibility` workflow_dispatch를 실행하고 artifact를 내려받는다.
로컬에서도 `python3 scripts/learn-pdf/repro.py dist/learn-pdfs`를 실행한다.
양쪽 `repro.json`의 페이지수·규격·공백 정규화 텍스트·임베드 폰트를 비교한다.
PDF 생성시각·Git 실습 캡처의 임시 커밋 식별자·OS별 rasterization은 바이트 비교 대상에서 제외한다.
폰트 고정 이후 페이지수는 과거 시스템 폰트 빌드와 달라질 수 있으며, 두 환경의 새 빌드끼리 비교한다.

입력은 `docs/lecture/01-*.md`부터 `12-*.md`까지다. 기존 slides/는 사용하지 않는다.
출력은 git에서 제외된 `dist/learn-pdfs/`: PDF 12개, 페이지수·대표 페이지 manifest,
추출 텍스트, 대표 페이지 PNG, 번들이다. R2에는 PDF만 업로드한다.

표는 넘칠 때만 헤더를 반복하며 고정 열 너비로 분절한다. 들어가는 인접 섹션은 합친다.
슬라이드 코드는 최대 3줄이다. 긴 예제는 Gist 링크와 실제 렌더/격리 Git 실행 화면으로 대체한다.
내용 보존·DOM 경계·넘침 거부 회귀 검사 후 PDF 전 페이지의 16:9 크기,
페이지수, 추출 텍스트와 단어 좌표를 검사한다. PNG는 표지·코드·Mermaid·최대 텍스트 장을 생성한다.
PNG 육안 확인은 별도로 수행하며, PDF 크기는 960×540pt(1280×720 CSS px)다.

revision은 강의 원문·렌더러·폰트·lock 전체의 결정론적 소스 해시다(시간 메타데이터가 있는 PDF 바이트 해시와 구분).
입력이 바뀌면 PDF 빌드·사이트 설정 로드·업로더·PDF 배포 래퍼가 실패한다.
명시적으로 `node scripts/learn-pdf/revision-update.mjs --update-revision`을 실행한다.
pdf.json과 README 12개 링크를 함께 갱신하고 사이트·D1 URL 일치 테스트를 실행한다.
그 후 PDF를 다시 빌드·검증한다. 완성 시 artifact.json에 revision과 12개 PDF SHA256을 기록한다.
`node --test scripts/learn-pdf/*.test.mjs`는 source/revision 불일치와 완성 후 PDF 변조 거부를 검사한다.

배포 순서(별도 승인 필요): revision 갱신 → PDF 빌드·검증 → R2 업로드 → 사이트 빌드 → D1 SQL 생성·원격 적용 → `node scripts/deploy-learn-pdfs.mjs` → HTTP/SHA/카탈로그 readback.
배포 래퍼는 원격 호출 전에 source/revision·PDF seal 일치를 검사한다. 직접 wrangler 호출로 우회하지 않는다.
실패 시 같은 revision 소스를 유지해 빌드·업로드를 재실행하고, R2 검증 전 사이트/D1을 전환하지 않는다.

Gist 게시(별도 승인 필요): `node scripts/publish-learn-gists.mjs`.
`qus0in`의 secret Gist만 사용하며 `gists.json` 매핑과 설명 조회로 중복 생성을 방지한다.
secret은 인증 없는 URL 열람이 가능하므로 비밀 정보 저장소가 아니다. 원본 코드 변경 시 검증이 실패한다.
스크린샷·실행 HTML은 `dist/learn-pdfs/screenshots/`에 남는다. GitHub 원격 배포 화면이 아닌 로컬 실습 결과다.
검증 후 업로드(별도 승인 필요): `node scripts/upload-learn-pdfs.mjs`.
정확히 12개 PDF를 `v0.1.0/revisions/<revision>/<file>.pdf`에 불변 업로드한다.
이미 같은 키가 있으면 동일 바이트만 no-op 허용하고 다르면 거부한다. 실패 후에는 원래 seal 산출물로 재시도한다.
같은 소스를 재빌드하면 생성시각 때문에 바이트가 달라질 수 있으므로 이미 공개한 revision을 덮어쓰지 않는다.

## PDF 캐시 정책

learn Worker의 files 도메인 PDF 경로 route와 FILES R2 binding을 사용한다.
plain URL은 최신 `?revision=<hash>`로 302(no-store); revision URL은 해당 불변 R2 키로 연결해 1년 immutable 캐시를 제공한다.
예전 ddf5a90 PDF도 별도 불변 키로 보존한다. 해당 archive는 원래 공개 객체와 SHA가 같아야 한다.
Worker route가 기존 R2 CDN cache 앞에서 응답하므로 오래된 plain 캐시를 반환하지 않으며 purge 권한을 요구하지 않는다.
새 PDF는 새 revision 키에 먼저 업로드·검증한 뒤 learn 설정·D1·Worker를 전환한다. 기존 revision 키 삭제·교체 금지.
plain/revision 각각 status·Location·Cache-Control·MIME·SHA·16:9·페이지수를 HTTP readback한다.
캐시 설정 변경이나 route 제거 시 오래된 CDN 객체가 다시 노출될 수 있으므로 별도 검증 없이 route를 해제하지 않는다.
