---
command: switch
subtitle: "브랜치를 만들거나 다른 브랜치로 이동한다."
stepRefs: ["10-branches-tags", "11-merge-conflicts", "12-pull-request", "appendix/02-git-options"]
---

# git switch

## 용도

작업 브랜치를 바꾼다. `-c`를 붙이면 새 브랜치를 만들면서 바로 이동한다. 작업 공간의 파일은 이동한 브랜치의 커밋 상태로 바뀐다. `git checkout`도 현재 브랜치 전환과 파일 복원에 사용하며, `git restore`는 파일 복원과 stage 해제를 담당한다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| `이름` | 기존 브랜치로 이동 | 없는 이름이면 오류 |
| `-c 이름` | 새 브랜치를 만들고 이동 | 현재 커밋에서 갈라진다 |
| `--detach 해시` | 특정 커밋으로 이동 | 브랜치가 아닌 커밋을 직접 가리킨다 |

## 예시

```bash
git switch -c feature/profile-design
git branch
git switch main
```

첫 줄로 새 브랜치에서 작업을 시작하고, `git branch`로 `*`가 새 브랜치에 붙었는지 본 뒤, 마지막 줄로 `main`에 돌아온다.

`git show 해시`는 이동 없이 커밋을 보여 준다. `git switch --detach 해시`로 이동하면 detached HEAD 상태가 된다. 여기서 만든 커밋을 보존하려면 이동 전에 `git switch -c 새브랜치`로 브랜치를 만들고, 돌아갈 때는 `git switch main`을 쓴다.

## 주의할 점

- 저장하지 않은 변경이 있으면 이동이 거절될 수 있다. 커밋한 뒤 이동한다.
- 작업 브랜치는 `main`에서 최신 상태(`git pull`)를 받은 뒤 만든다.
- `git checkout`도 같은 일을 하지만 역할이 여러 개라 헷갈리므로 수업에서는 `switch`를 쓴다.

<CommandLinks />
