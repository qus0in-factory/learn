---
command: pull
subtitle: "원격 저장소의 새 커밋을 받아 로컬 브랜치에 통합한다."
stepRefs: ["05-remote", "12-pull-request", "appendix/02-git-options"]
---

# git pull

## 용도

원격 변경을 받아 설정된 방식으로 현재 브랜치에 통합한다. 이력이 갈라지면 거절되거나 충돌할 수 있다. push가 거절되면 원격과 로컬 이력을 먼저 확인하고, 바로 pull하지 않는다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| `origin main` | 원격 `origin`의 `main`을 받아 현재 브랜치에 통합 | 수업에서 쓰는 형태 |
| (없음) | 연결된 업스트림에서 받아 통합 | `push -u`를 한 번 한 뒤 |

## 예시

```bash
git switch main
git pull origin main
git status
git log --oneline
```

Pull Request를 병합한 뒤 이 순서로 실행하면 `git log --oneline`에 병합 커밋이 보이고 `git status`가 깨끗하다.

## 주의할 점

- 작업 중인 변경이 있으면 pull 전에 커밋하거나 정리한다. 같은 파일을 고쳤다면 충돌이 날 수 있다.
- 충돌이 나면 `git status`로 파일을 확인하고 충돌 표시를 정리한 뒤 커밋한다. 막히면 `git merge --abort`로 돌아간다.
- `git pull`은 내려받기와 병합을 한 번에 한다. 어느 쪽이 바뀌었는지 `git log --oneline --graph --all`로 확인하는 습관을 들인다.

<CommandLinks />
