---
command: reset
subtitle: "스테이징을 해제하거나 로컬 커밋 포인터를 되돌린다."
stepRefs: ["03-commit-history", "04-amend-ignore", "appendix/02-git-options"]
---

# git reset

## 용도

현재 브랜치가 가리키는 커밋을 뒤로 옮기거나, 파일 하나의 스테이징을 해제한다. 세 모드(`--soft`, `--mixed`, `--hard`) 중 어디까지 되돌릴지가 달라지며, `--hard`는 작업 파일 변경까지 지운다. 수업에서는 파일 단위 스테이징 해제 외에는 쓰지 않는다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| `파일명` | 그 파일만 스테이징 해제, 작업 파일 보존 | `git restore --staged`와 같은 결과 |
| `--soft HEAD~1` | 직전 커밋을 취소하고 변경은 스테이징에 남김 | 커밋 전 상태로 복귀 |
| `--mixed HEAD~1` | 직전 커밋을 취소하고 변경은 작업 공간에 남김 | 모드 생략 시 기본값 |
| `--hard` | 커밋과 작업 파일 변경을 모두 삭제 | 수업에서 절대 쓰지 않는다 |

## 예시

```bash
git add .
git reset style.css
git status
```

`style.css`만 스테이징에서 내려오고 파일 내용은 그대로다. 수업에서는 같은 뜻이 더 분명한 `git restore --staged style.css`를 우선 쓴다.

## 주의할 점

- `--hard`는 저장하지 않은 작업을 되돌릴 수 없이 지운다. 파일 복원이 필요하면 실행하지 말고 강사에게 문의한다.
- 이미 push한 커밋을 `reset`으로 지우면 원격과 이력이 어긋난다. 공유된 커밋은 `git revert`로 되돌린다.
- `HEAD~1`은 직전 커밋을 뜻한다. 숫자를 늘리면 그만큼 더 되돌아가므로 실행 전 `git log --oneline`으로 확인한다.

<CommandLinks />
