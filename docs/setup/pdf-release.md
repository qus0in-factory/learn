# PDF 배포 가드와 원격 readback

## 준비

고정 Chromium·폰트 빌드와 revision 갱신은 `scripts/learn-pdf/usage.md`를 따른다.
Node 최신 지원 LTS, curl, Wrangler 인증, 봉인된 `dist/learn-pdfs/artifact.json`과 PDF 12개가 필요하다.
운영 도구는 `scripts/learn-pdf-ops/`에 두어 문서·운영 테스트 변경만으로 PDF revision이 변하지 않게 한다.

## 배포 전

1. `node scripts/upload-learn-pdfs.mjs`: 새 revision의 불변 R2 키를 채운다. 같은 키의 다른 바이트는 거부한다.
2. `node scripts/verify-learn-r2.mjs`: R2에서 12개 키를 직접 읽어 로컬 seal의 SHA256·크기와 비교한다. 누락·읽기 실패·크기/해시 불일치 중 하나라도 있으면 실패한다.
3. `node scripts/deploy-learn-pdfs.mjs`: 같은 원격 완전성 검사를 **먼저** 수행한 뒤에만 사이트 빌드·D1 SQL 생성·learn Worker 배포·D1 적용을 차례로 실행한다.

실패 시 사이트·D1 갱신 명령은 시작되지 않는다. 업로드가 일부만 성공했다면 원래 봉인된 산출물로 업로더를 재실행한다.
수동 `wrangler deploy`/`d1 execute`로 이 가드를 우회하지 않는다. 로컬 SQL 생성만 하는 `sync-learn-d1.mjs`는 원격을 변경하지 않으므로 CI에서도 쓸 수 있다.

## 배포 후

`node scripts/verify-learn-http.mjs`를 실행한다.
plain 12개 URL의 302/no-store/최신 Location, 그 revision URL의 200/MIME/1년 immutable/크기/SHA를 검사한다.
사이트 12개 PDF 버튼과 카탈로그 API의 URL 일치도 확인하고 `dist/learn-pdfs/live-readback.json`에 증거를 남긴다.
이는 edge HIT나 이미 브라우저에 저장된 구 plain PDF의 삭제를 보장하지 않는다.

두 원격 검증 명령은 네트워크·배포 상태·인증에 의존하므로 CI에 넣지 않는다.
로컬 회귀만 `node --test scripts/learn-pdf-ops/*.test.mjs`로 실행한다. updater CLI opt-in·12개 URL 갱신·멱등, 누락/잘림/동일 크기 변조 시 배포 명령 0회를 검사한다.
updater 회귀의 격리 fixture는 자식 URL 테스트를 stub하며, 실제 URL 일치는 기존 `scripts/learn/{readme,url}.test.mjs`로 별도 검증한다.

## #5의 검증 범위와 CI 정책

사용자 결정으로 **두 OS PDF e2e는 완료 조건에서 제외하고 단위 테스트로 대체**했다.
`pdf-repro.yml`과 전용 CI bootstrap entry를 제거했다. 기존 로컬 고정 환경의 12개/114장 검증은 근거로 유지한다.
`scripts/learn/pdf-*.test.mjs`는 기존 CI test 스텝의 `scripts/learn/*.test.mjs` glob에서 자동 실행된다.
브라우저·네트워크 없이 mock과 순수 계산으로 Chromium 경로/버전, 고정 폰트 CSS, fallback 거부, 페이지 크기·분절·경계, 설정 결정성, ZIP SHA 거부를 확인한다.
PDF 소스 revision·updater·R2 guard 로컬 회귀도 같은 glob에 연결했다. ci.yml은 수정하지 않는다.
기존 usage.md의 workflow_dispatch/두 환경 비교 안내는 이 결정으로 폐기됐으며 이 문서의 단위 테스트 절차가 우선한다.
운영 문서까지 포함하는 기존 source hash 계약을 깨지 않기 위해 이번 CI 정책 변경만으로 PDF revision을 갱신하지 않는다.

## 로컬 Linux 설치 관찰(선택 검증)

run 41587181496은 Chromium 다운로드 100% 직후 더 진행하지 못해 20분 제한으로 취소됐다. PDF 생성까지 도달하지 않았다.
따라서 일반 Playwright 설치기의 성공이나 Linux 재현성 검증으로 취급하지 않는다. Node 전체 문제라고 단정하지도 않는다.
Ubuntu 전용 `bootstrap-browser.mjs`는 같은 Playwright manifest의 Chromium1194·headless shell1194·FFmpeg1011 공식 ZIP을 curl로 받는다.
`browser-assets.json`의 SHA256과 manifest revision을 확인한 뒤 unzip으로 설치하며 시스템 Chrome으로 대체하지 않는다.
그 후 기존 Playwright 의존성 설치·PDF 빌드·fallback 검사를 그대로 실행한다. ZIP이 바뀌거나 manifest가 다르면 실패한다.
이 설치·PDF 빌드·두 OS 비교는 CI에서 실행하지 않는다. 별도 로컬 Linux 검증은 보조 근거이며 필수 완료 조건이 아니다.
