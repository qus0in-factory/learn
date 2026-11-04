---
audience: user
---

# learn 운영 배포

## 현재 구성

- `https://echo.qus0in.dev/`는 자료 목록, `/git/`은 Git 과정이다. `/git/slides/`·`/git/docs/`·hdai 배포 예시는 현행 절차가 아니다.
- `learn-worker/wrangler.jsonc`의 `learn` Worker와 `dist/learn` ASSETS를 쓴다. STEP 12개·부록 12개(환경 준비/Git 활용/문서·웹)·명령어 19개·태그·내장 검색을 제공한다.
- 폰트·표지·OG·삽화는 `https://files.qus0in.dev/static/<sha256>/...`의 불변 R2 자산이다. 현재 76개이며 `scripts/static-assets/settings.json`이 개수 기준이다.
- PDF namespace는 `v0.1.0/`, 고정 revision은 `992baeb3737fad565f42860e75bbc5c502eadfb4`이다. 제품 릴리스 번호와 구분한다.
- 보충 원본은 제거했고 `/git/supplement/*`·`/supplement/*`는 `/git/`로 301 이동한다. 강의 본문은 D1을 매번 조회하지 않는 정적 HTML이다.

## 작업 환경

Git 이력이 있는 저장소에서 빌드한다. worktree는 메인과 같은 부모의 `.worktrees/`에 두고 의존성을 메인 `course-site/node_modules`에 연결한다. 설치가 필요하면 메인에서 frozen lockfile로 처리한다.

```sh
ln -s /absolute/path/to/main/course-site/node_modules course-site/node_modules
ln -s ../course-site/node_modules learn-site/node_modules
```

Node 지원 LTS를 쓴다. 보호된 메인 `.env.local`을 `--env-file`로 직접 주입하며 복사·출력·커밋하지 않는다. `VITE_KAKAO_JS_KEY`가 없거나 빌드 JS에 같은 32자리 키가 없으면 배포 가드가 중단한다. CI에 키나 새 단계를 추가하지 않는다.

## 빌드와 기존 검사

```sh
export ENV_FILE=/absolute/path/to/main/.env.local
VITE_ASSET_CDN_BASE_URL=https://files.qus0in.dev node --env-file="$ENV_FILE" ./course-site/node_modules/vitepress/bin/vitepress.js build learn-site
node --test scripts/learn/*.test.mjs learn-worker/*.test.mjs
node --test learn-site/*.test.mjs
node scripts/content-lint.mjs docs/lecture
```

현재 기존 검사는 단위·통합 43개와 사이트 9개이다. 새 테스트·CI 변경은 별도 승인이다. 사이트 빌드는 sitemap·robots·페이지별 Markdown·llms 파일도 생성한다.

## 새 정적 자산

원본·생성 메타데이터를 보존하고 기존 `scripts/static-assets/cover.py`로 AVIF/WebP를 만든다. 새 파일명은 plan 필터, 예상 개수는 settings에 반영한다.

```sh
node scripts/static-assets/plan.mjs
NODE_OPTIONS=--dns-result-order=ipv4first node scripts/static-assets/upload.mjs --path-prefix=/new-stem
NODE_OPTIONS=--dns-result-order=ipv4first node scripts/static-assets/upload.mjs --path-prefix=/new-stem --apply
NODE_OPTIONS=--dns-result-order=ipv4first node --input-type=module -e "import {verify} from './scripts/static-assets/verify.mjs'; await verify()"
```

dry-run→apply→원격 size/SHA 확인 후 같은 CDN 설정으로 다시 빌드한다. `verify.mjs`는 함수를 명시적으로 호출한다. `deploy.mjs`는 새 자산을 업로드하지 않고 검증 후 Worker만 배포한다.

## dev와 운영 배포

1. 변경 경로·`.gitignore`·스테이징을 확인하고 로컬 dev에 통합한다. 다른 워커 변경을 버리지 않는다.
2. dev push 후 배포할 **정확한 SHA의 CI success**를 확인한다. 커밋된 clean tree에서만 배포한다.
3. Worker·D1을 함께 바꾸는 다른 워커와 순서를 확인한다. PDF는 [고정·교체 절차](setup/pdf-release.md)를 별도로 따른다.

```sh
NODE_OPTIONS=--dns-result-order=ipv4first VITE_ASSET_CDN_BASE_URL=https://files.qus0in.dev node --env-file="$ENV_FILE" scripts/static-assets/deploy.mjs
```

가드는 키 존재·모든 빌드 HTML/CSS의 CDN 참조·전체 R2 size/SHA를 확인한다. 일반 정적 배포는 D1을 다시 적용하거나 PDF를 재생성하지 않는다. main 승격·태그·릴리스는 별도 승인이다.

## readback

- SHA·정확 SHA CI·Worker version ID를 함께 기록한다. HTML/Markdown·이미지·검색·버튼·PDF 링크를 요청 범위에서 확인한다.
- `scripts/learn-ops/readback.sh`는 `ECHO_BASE`·`FILES_BASE`·`RESOLVE_IP`로 기본 URL을 덮어쓸 수 있다. PDF version은 `pdf.json`에서 읽는다.
- 배포 직후 응답 차이는 로컬 산출물·현재 Worker·실제 응답을 확인한 뒤 읽기만 재검증한다. 원인 확인 전 재배포하지 않는다.
- tail/로그는 보호된 임시 경로에 두고 민감 값 점검 전 공개하지 않는다. 본인이 시작한 preview·브라우저·tail만 종료한다.
- 로컬 workerd 지원 날짜가 낮으면 오류에 나온 날짜를 dev 옵션으로 쓴다. 운영 `compatibility_date` 변경이나 가드 우회로 해결하지 않는다.

## 관련 문서

- [운영 목차](operations/index.md) · [콘텐츠 규칙](content-style.md)
- [PDF 고정](setup/pdf-release.md) · [D1 동기화](setup/d1-sync.md)
- [검색·분석](operations/search-analytics.md) · [카카오 공유](operations/kakao-sharing.md) · [광고](operations/advertising.md)
