---
name: echo-deploy
description: echo 사이트·Worker 배포, PDF 재생성·교체, R2 정적 자산 업로드, D1 원격 적용, Gist 게시 등 원격 쓰기를 요청받았을 때 사용. 승인 경계와 따라야 할 운영 문서를 안내한다.
---

# 원격 쓰기·배포

## 승인 경계
- 원격 쓰기 승인·CI 제한·비밀값 비노출 원칙은 [AGENTS.md](../../../AGENTS.md)를 따른다. 이전 승인을 다음 작업에 넓히지 않으며, 일반 사이트 배포는 PDF 재생성·D1 적용을 포함하지 않는다.
- `.env.local`은 `ENV_FILE=/절대/경로/.env.local`로 경로를 지정해 `node --env-file="$ENV_FILE"`로만 주입한다.

## 따를 문서
| 작업 | 문서 |
|---|---|
| 정적 사이트·Worker 배포, 새 정적 자산 | [deployment.md](../../../docs/deployment.md) |
| PDF 고정·승인된 교체·readback | [pdf-release.md](../../../docs/setup/pdf-release.md) |
| D1 SQL 생성·원격 적용 | [d1-sync.md](../../../docs/setup/d1-sync.md) |
| 현재 고정 revision·배포 SHA 기록 | [운영 목차](../../../docs/operations/index.md) |

## 순서
1. `dev`가 깨끗하고 배포할 SHA의 CI가 성공했는지 확인한다(`gh run list --branch dev`).
2. `echo-verify` 스킬로 로컬 검증을 통과시킨다.
3. easy PDF revision(`learn-site/.vitepress/pdf-easy.json`)이 바뀌면 사이트 배포 전에 `scripts/learn-pdf-easy/upload-easy.mjs`(`--dry-run` 확인 후 인자 없이 실행해 R2 업로드·원격 SHA-256 대조)를 선행한다.
4. `scripts/static-assets/deploy.mjs`는 `dist/learn`이 운영 값으로 빌드돼 있어야 통과한다(운영 변수를 주입하지 않은 `verify-local.sh` 기본 실행 산출물은 CDN·카카오 키가 없어 가드에 걸림). 배포 직전 `ENV_FILE=/절대/경로/.env.local`을 정의하고 `VITE_ASSET_CDN_BASE_URL=https://files.qus0in.dev node --env-file="$ENV_FILE" ./course-site/node_modules/vitepress/bin/vitepress.js build learn-site`로 다시 빌드한다.
5. 정적 자산 업로드는 `scripts/static-assets/upload.mjs`(기본 dry-run → `--apply`)를 따른다. `scripts/static-assets/deploy.mjs`에는 dry-run 옵션이 없으며 빌드 가드(`checkBuild`)와 원격 크기·SHA 검증(`verify.mjs`) 후 곧바로 Worker를 배포한다.
6. 원격 크기·SHA 검증은 정적 자산 `scripts/static-assets/verify.mjs`와 easy PDF `scripts/learn-pdf-easy/upload-easy.mjs`가 맡고, 배포 후 HTTP 상태·`Location`·`Cache-Control` 기록은 `OUT` 인자가 필수인 `scripts/learn-ops/readback.sh /tmp/readback.txt`로 수행한다. readback 없이 완료로 보고하지 않는다.
7. 배포 SHA·CI run·Worker version·검증 결과를 `docs/operations`([운영 목차](../../../docs/operations/index.md) "현재 상태")에 기록한다.
