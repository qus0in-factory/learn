# CI 검증 및 수동 검증 범위

## CI 자동 검증

워크플로는 `.github/workflows/ci.yml`이다.

- **런타임**: Node.js v26 (2026-11 최신 LTS, [일정](https://github.com/nodejs/Release/blob/main/schedule.json))
- **빌드 전 검증 (43건)**:
  - `scripts/learn/*.test.mjs`와 `learn-worker/*.test.mjs`를 합쳐 43건이다. PDF URL, README, D1 SQL, assets 설정, API, 카탈로그, 리다이렉트, PDF 요청/응답을 본다.
- **Markdown 린트 (`scripts/lint-markdown.cjs`)**:
  - CI 러너의 워크스페이스 스킬 접근 불가로 vendoring 사본 탑재
  - 출처: `.agents/skills/lint-korean-markdown` (detector·CLI 통합)
  - 동기화: 원본 스킬 갱신 시 저장소 스크립트에 반영
- **빌드·사후 검증 (9건)**:
  - `learn-site` VitePress 정적 빌드 (`ci.md`는 `srcExclude`로 제외)
  - `learn-site/*.test.mjs` (9건): 24개 고정 페이지 목록 및 링크 검증
- **산출물**: `dist/learn-d1.sql` 로컬 생성 (원격 비밀값 미사용)

## 수동·전담 워커 검증

1. **원격 배포**: Cloudflare Worker(D1 바인딩) 및 R2 실제 배포·readback. 사이트·Worker·PDF 재배포는 이 문서 절차가 자동으로 하지 않는다.
2. **PDF 재생성**: 승인된 교체만 [PDF 배포 가드](setup/pdf-release.md)를 따른다. 전담 워커 별칭으로 절차를 나누지 않는다.
3. **GFM 대조**: `gh api /markdown` 원격 파서 일치 검증 (`scripts/test-gfm-compare.mjs`)
