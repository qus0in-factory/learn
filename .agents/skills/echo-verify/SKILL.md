---
name: echo-verify
description: echo 저장소에서 코드·콘텐츠·스크립트를 바꾼 뒤 커밋·인계 전에 로컬 검증할 때 사용. CI와 같은 단계를 scripts/verify-local.sh로 실행하고 결과를 보고하는 방법.
---

# 로컬 검증

- 검증 범위는 [docs/ci.md](../../../docs/ci.md), 테스트·CI 제한은 [AGENTS.md](../../../AGENTS.md)를 따른다.
- 기본: `scripts/verify-local.sh` — Markdown 린트 → 빌드 전 테스트 → `learn-site` 빌드 → 빌드 산출물 검증 → `dist/learn-d1.sql` 생성(원격 미적용).
- 빠른 확인: `--quick`(빌드 생략). 강의 본문(`docs/lecture`) 변경: `--content`로 `content-lint`까지 실행하고 [콘텐츠 규칙](../../../docs/content-style.md)을 따른다.
- 의존성은 메인 `course-site/node_modules` 하나만 쓴다. 워크트리는 `course-site/node_modules`를 메인 경로 symlink로 연결하며([배포 문서](../../../docs/deployment.md) 참고), `verify-local.sh`는 `learn-site/node_modules`만 자동 연결하고 `pnpm exec` 없이 동작한다.
- CI Node 패치 업데이트로 `node:sqlite` 동작이 바뀔 수 있으니 CI만 실패하면 CI Node 버전으로 재현한다.
- 슬라이드·PDF(`scripts/learn-pdf*`) 변경은 해당 디렉터리의 기존 테스트·렌더 확인을 추가로 돌린다. 원격 PDF·R2·D1·Worker는 검증 대상이 아니다(`echo-deploy` 스킬).
- 구조화 데이터(JSON-LD) 변경 시 `JSON.parse` 파싱만 확인하지 않고 `Course`(`name`·`description`·`provider`) 등 타입별 필수 속성과 불완전 중첩 노드 여부를 함께 검증한다.
- 보고: 실행한 명령, 통과/실패 건수, 생략한 단계와 이유. 미실행·환경 차단을 통과로 적지 않는다.
