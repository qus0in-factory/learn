---
command: restore
subtitle: "실수로 스테이징한 파일을 작업 파일은 남긴 채 내린다."
stepRefs: ["03-commit-history", "04-amend-ignore", "appendix/02-git-options"]
---

# git restore

## 용도

스테이징 영역에 올린 파일을 다시 내려 다음 커밋에서 제외한다. `--staged`를 붙이면 작업 공간의 파일 내용은 그대로 두고 스테이징 상태만 되돌리므로, `git add .`로 잘못 올린 파일을 안전하게 정리할 수 있다.

옵션 없이 사용하면 작업 파일을 복원한다. `git switch`는 브랜치 전환에 쓰고, `git checkout`은 현재도 전환과 파일 복원 등 여러 역할에 쓴다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| `--staged 파일명` | 스테이징 해제, 작업 파일 보존 | 수업에서 쓰는 유일한 형태 |
| `파일명` (옵션 없음) | 작업 파일을 마지막 커밋 상태로 되돌림 | 저장하지 않은 변경이 사라지므로 수업에서 쓰지 않는다 |

## 예시

```bash
git add .
git status
git restore --staged style.css
git status
```

`style.css`가 초록색 `Changes to be committed`에서 빨간색 `Changes not staged for commit`으로 내려가고, 파일 내용은 바뀌지 않는다.

## 주의할 점

- `--staged` 없이 실행하면 작업 공간의 변경이 사라진다. 되돌릴 수 없으므로 파일 단위 스테이징 해제에는 항상 `--staged`를 붙인다.
- 커밋을 되돌리는 명령이 아니다. 이미 커밋한 내용은 `git revert`로 되돌린다.
- `git reset 파일명`도 같은 결과를 내지만, 수업에서는 뜻이 분명한 `git restore --staged`를 쓴다.

<CommandLinks />
