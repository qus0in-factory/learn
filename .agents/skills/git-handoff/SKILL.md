---
name: git-handoff
description: echo 저장소에서 브랜치를 만들거나 커밋·병합·푸시·PR을 하거나 커밋 메시지를 쓸 때 사용. 브랜치 흐름, 메시지 형식, 권한 경계.
---

# 브랜치·커밋

## 흐름
- 작업 브랜치(`feat/<slug>`·`fix/<slug>`·`docs/<slug>`)는 `dev`에서 분기한다. 묶음 작업은 통합 브랜치(예: `feat/easy-gloss-sync`)로 모은 뒤 `dev`에 병합한다.
- 병렬 쓰기 작업은 worktree를 쓰고 생성 직후 `course-site/node_modules` symlink 연결([배포 문서](../../../docs/deployment.md) 작업 환경)과 하네스·검증 스크립트 커밋 여부를 확인한다. 분배 시 소유 파일 목록에는 `import`로 얽힌 파일까지 포함한다. 병합 후 `git worktree remove`·`git worktree prune`과 병합된 로컬 브랜치 삭제까지 해야 완료다.
- 리뷰는 구현자와 다른 워커가 맡고, 수정 지적은 반영 커밋과 재확인 결과로 연결한다. 리뷰 대기 중인 작업 브랜치·위키 로컬 커밋은 인계 대상이며 리뷰 전 병합·push·정리하지 않는다.
- `dev→main`은 PR로만 한다. `main` 직접 푸시·머지·태그는 사용자 명시 요청 시에만 한다.

## 권한
- Git 쓰기(커밋·병합·푸시·PR)는 총괄만 한다. Herdr 워커는 조회만 한다.
- `reset --hard`·강제 푸시·브랜치 삭제 전에 미커밋 변경과 대상 커밋을 확인한다. 정리 전 백업은 존재를 확인한 뒤 진행한다.

## 메시지
- `<type>(<scope>): <영문 소문자 명령형>` 단일 행. 예: `fix(git-easy): use glossary terms for remote commands`.
- type: `feat`·`fix`·`docs`·`refactor`·`test`·`chore`. scope는 작업 영역(`git-easy`·`git-easy-pdf`·`learn-worker`·`agents` 등).
- 병합 커밋은 `merge: <요약>`. PDF 재빌드만 담은 커밋은 `chore(<scope>): rebuild ...`로 분리한다.
- 작성 전 `git log --oneline -20`으로 최근 scope·어휘를 맞춘다. 목적별로 `git add <files>` 분할 커밋한다.
