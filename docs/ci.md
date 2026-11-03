# CI 검증 및 수동 검증 범위

## CI 자동 검증 항목 (`.github/workflows/ci.yml`)

1. **빌드**: `learn-site` VitePress 정적 빌드
2. **테스트 러너**: `node --test` 기반 16건 단위·통합 검증
   - `learn-site/pdf.test.mjs`: 차시별 PDF 유효성
   - `scripts/learn/*.test.mjs`: PDF URL revision, README 동기화, D1 SQL, assets 설정
   - `learn-worker/api.test.mjs`: 로컬 모의 DB 기반 API 동작
3. **Markdown 린트**: `scripts/lint-markdown.cjs` 강조 리터럴 깨짐 검사
4. **산출물 생성**: `dist/learn-d1.sql` 로컬 생성 (원격 비밀값 미사용)

## 수동·전담 워커 검증 항목

1. **원격 배포**: Cloudflare Worker(D1 바인딩) 및 R2 실제 배포·readback
2. **PDF v2 생성**: Chromium 기반 PDF 렌더링·재생성 (`sol-b` 전담)
3. **GFM 대조**: `gh api /markdown` 원격 파서 일치 검증 (`scripts/test-gfm-compare.mjs`)
