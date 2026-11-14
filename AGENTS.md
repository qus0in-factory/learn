# AGENTS.md
- 이 파일은 매 세션 토큰에 포함된다. 한 줄 포인터만 두고 상세 절차는 `.agents/skills/`(원본, `.claude/skills`는 상대 symlink)에 둔다(작성법: `agents-md-authoring` 스킬).
- 사용자 요청을 최우선하고 범위를 넓히지 않으며 미커밋 WIP를 보존한다.
- 요청하지 않은 CI·단위 테스트·e2e를 추가하지 않는다. CI 워크플로 변경과 외부 비용·한도가 드는 대안은 사용자 승인을 먼저 받는다. 범위는 [docs/ci.md](docs/ci.md).
- 변경 후 커밋·인계 전 로컬 검증은 `scripts/verify-local.sh`(`echo-verify` 스킬). 강의 본문은 [docs/content-style.md](docs/content-style.md)를 따른다.
- e-opus는 총괄로서 Herdr 워커(e-sol·e-beam·e-ds·e-hydro)에 분배만 하고, 대기는 `worker-watcher` 서브에이전트에 맡기며 직접 폴링·검수하지 않는다. 리뷰·최종 검수는 구현자와 다른 Herdr 워커가 맡고 `work-reviewer`는 자제한다. 설계·구조 판단과 설계 리뷰는 `fable-designer` 서브에이전트(fable)가 하고 문서화는 `design-writer`에 맡긴다(`herdr-orchestration` 스킬). 라벨은 `e-<모델 약칭>`으로 `herdr` CLI로 직접 붙이고 외부 저장소 스크립트를 쓰지 않는다.
- e-sol(Codex)은 `.codex/agents`의 explorer·test-runner·deploy-checker 서브에이전트에 탐색·검증·readback을 위임한다. fast(`service_tier`)는 쓰지 않는다.
- 브랜치: 작업 브랜치 → 로컬 `dev` 병합·push → `dev→main` PR. 커밋 형식·권한은 `git-handoff` 스킬.
- 배포·PDF 교체·R2·D1 원격 적용·Gist 게시·태그는 사용자 명시 요청 시에만 한다(`echo-deploy` 스킬).
- 비밀 키·토큰·`.env*` 값을 코드·로그·문서·보고에 노출하지 않는다.
