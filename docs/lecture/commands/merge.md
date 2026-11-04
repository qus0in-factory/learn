---
command: merge
subtitle: "다른 브랜치의 커밋을 현재 브랜치에 합친다."
stepRefs: ["11-merge-conflicts", "appendix/02-git-options"]
---

# git merge

## 용도

지정한 브랜치의 변경을 현재 브랜치에 통합한다. 같은 파일의 같은 부분을 양쪽에서 고쳤다면 충돌이 나며, 충돌 표시를 정리하고 커밋해야 병합이 끝난다. 막히면 `--abort`로 병합 전 상태로 돌아갈 수 있다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| `브랜치명` | 그 브랜치를 현재 브랜치에 병합 | `main`에서 실행한다 |
| `--abort` | 진행 중인 병합을 취소하고 복귀 | 충돌 해결이 어려울 때 |
| `--no-ff` | 항상 병합 커밋을 남김 | 생략하면 가능한 경우 빨리감기 |

## 예시

```bash
git switch main
git merge feature/profile-design
git status
git log --oneline --graph --all
```

충돌이 없으면 바로 끝난다. `CONFLICT` 메시지가 나오면 `git status`의 파일을 열어 `<<<<<<<`, `=======`, `>>>>>>>` 사이에서 남길 내용을 고르고, `git add` 뒤 `git commit`으로 마무리한다.

## 주의할 점

- 충돌 표시 줄을 지우지 않고 커밋하면 그대로 파일에 남는다. `git diff`로 표시가 모두 사라졌는지 확인한다.
- 해결이 꼬이면 `git merge --abort`로 돌아간 뒤 강사와 확인한다. `git reset --hard`는 쓰지 않는다.
- 병합이 끝난 브랜치는 `git branch -d`로 정리한다.

<CommandLinks />
