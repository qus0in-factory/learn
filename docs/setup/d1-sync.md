# D1 카탈로그 동기화와 복구

## 배경

`wrangler d1 execute`는 SQL 파일 안의 `BEGIN`/`COMMIT`을 거부한다. 기존 동기화는 네 테이블을 `DELETE`한 뒤 `INSERT`했으므로 중간 실패 시 공개 catalog가 부분 상태를 읽을 수 있었다.

## 구조

- `catalog_versions`: 동기화 실행마다 하나씩 추가되는 dataset 버전과 공개 메타데이터.
- `catalog_pointer`: `id = 1` 한 행만 유지하며 현재 공개 dataset 버전을 가리킨다.
- `catalog_lectures`, `catalog_pdfs`, `catalog_quiz`, `quiz_links`: `catalog_version`을 포함한 dataset별 행. `quiz_links`는 퀴즈와 여러 차시의 연결을 보존한다.
- 기존 `course_meta`, `lectures`, `pdf_assets`, `quiz_questions`는 이전 Worker 호환을 위해 남겨 둔다. 새 Worker는 읽지 않는다.

## 적용 순서

1. `npx wrangler d1 migrations apply learn --remote --config learn-worker/wrangler.jsonc`로 스키마 migration을 적용한다.
2. `node scripts/sync-learn-d1.mjs`로 `dist/learn-d1.sql`을 만든다.
3. `npx wrangler d1 execute learn --remote --config learn-worker/wrangler.jsonc --file=dist/learn-d1.sql`로 적용한다.
4. `npx wrangler d1 execute learn --remote --config learn-worker/wrangler.jsonc --command "SELECT * FROM catalog_pointer"`로 active 버전을 확인한다.
5. Worker와 사이트를 배포한 뒤 `/api/catalog`의 12개 강의·12개 PDF·10개 퀴즈와 `lessons` 배열을 readback한다.

동기화 SQL은 다음 순서로 실행된다.

1. active가 아닌 이전/중단 dataset 정리
2. 새 dataset의 `catalog_versions`·강의·PDF·퀴즈 `INSERT`
3. `catalog_pointer`를 새 버전으로 바꾸는 단일 UPSERT
4. 이전 dataset 정리

3번이 단일 문장이므로 독자는 이전 dataset 또는 새 dataset 중 하나만 본다. API는 pointer를 한 번만 읽는 단일 SQL로 catalog를 만들므로 여러 테이블을 섞어 읽지 않는다.

## 실패와 재실행

- 임의의 `INSERT`가 실패하면 pointer는 이전 버전을 유지한다. 새 dataset의 일부 행은 inactive 상태로 남지만 공개되지 않는다.
- 같은 명령을 다시 실행하면 시작 정리 단계에서 inactive 잔여 행을 지우고 새 dataset을 만든 뒤 pointer를 전환한다. 재실행 결과는 동일한 12/12/10 카탈로그다.
- pointer 전환 뒤 정리 단계가 실패해도 공개 데이터는 완전한 새 dataset이다. 다음 동기화가 inactive 행을 정리한다.
- migration `0001`만 적용된 기존 DB는 `0002_catalog_versions.sql`이 기존 행을 `legacy-0001` dataset으로 복사한다. 새 동기화 전까지 이전 데이터를 그대로 제공한다.
- `0003_quiz_links.sql`은 `quiz_links`를 만들고 기존 `catalog_quiz.lesson_slug`를 대표 링크로 seed한다. 이후 동기화가 모든 링크를 다시 채운다.
- 복구 확인:
  ```sh
  npx wrangler d1 execute learn --remote --config learn-worker/wrangler.jsonc \
    --command "SELECT catalog_version FROM catalog_pointer; SELECT count(*) FROM catalog_lectures WHERE catalog_version=(SELECT catalog_version FROM catalog_pointer);"
  ```
