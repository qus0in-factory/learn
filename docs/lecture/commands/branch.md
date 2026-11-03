---
command: branch
subtitle: "브랜치 목록을 보고 이름을 바꾸거나 병합이 끝난 브랜치를 지운다."
stepRefs: ["05-remote", "10-branches-tags", "11-merge-conflicts", "12-pull-request", "appendix/02-git-options"]
---

# git branch

## 용도

브랜치를 나열하고 정리한다. 현재 브랜치에는 `*`가 붙는다. 새 브랜치를 만들어 이동하는 일은 `git switch -c`가 맡고, `git branch`는 이름 변경과 병합이 끝난 브랜치 삭제에 쓴다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| (없음) | 로컬 브랜치 목록 출력 | 현재 브랜치에 `*` |
| `-M main` | 현재 브랜치 이름을 `main`으로 변경 | 첫 push 전 기본 브랜치 이름 맞추기 |
| `-d 이름` | 병합이 끝난 브랜치 삭제 | 병합 전이면 `not fully merged`로 거절 |
| `-D 이름` | 병합 여부와 관계없이 강제 삭제 | 수업에서 쓰지 않는다 |

## 예시

```bash
git branch
git branch -M main
git branch -d feature/profile-design
```

세 번째 줄은 STEP 11에서 병합을 마친 뒤에만 성공한다. 병합 전에는 Git이 삭제를 거절한다.

## 주의할 점

- `-d`가 거절되면 아직 병합되지 않은 커밋이 있다는 뜻이다. `-D`로 강제하지 말고 병합을 먼저 끝낸다.
- 브랜치 이름에는 `feature/`, `fix/`처럼 목적을 붙이고 공백을 쓰지 않는다.
- 원격의 같은 이름 브랜치는 로컬 삭제로 지워지지 않는다. GitHub 웹에서 Pull Request 병합 뒤 삭제한다.

<CommandLinks />
