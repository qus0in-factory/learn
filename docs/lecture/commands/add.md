---
command: add
subtitle: "다음 커밋에 넣을 파일을 스테이징 영역에 올린다."
stepRefs: ["02-local-repository", "03-commit-history", "appendix/02-git-options"]
---

# git add

## 용도

작업 공간의 파일 변경을 스테이징 영역에 올려 다음 커밋 스냅샷에 포함하기로 확정한다. 새 파일은 추적 대상이 되고, 수정된 파일은 현재 내용이 커밋 후보가 된다. 어떤 변경을 한 커밋에 묶을지 고르는 명령이다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| `파일명 ...` | 지정한 파일만 스테이징 | 여러 파일은 공백으로 나열 |
| `.` | 현재 폴더 아래 모든 변경을 스테이징 | 입문 단계에서는 지양 |

## 예시

```bash
git add index.html style.css images/.gitkeep
git status
git add index.html
```

첫 줄은 세 파일을 한 번에 올린다. 마지막 줄처럼 파일을 하나만 올리면 변경을 커밋 단위로 나눌 수 있다.

## 주의할 점

- `git add .`는 편리하지만 비밀정보나 임시 파일까지 올릴 수 있다. 파일명을 지정해 올리는 습관을 들인다.
- 실수로 올린 파일은 `git restore --staged 파일명`으로 내린다. 작업 파일은 그대로 남는다.
- `git add` 뒤에 파일을 또 수정하면 수정분은 스테이징되지 않는다. 다시 `git add`해야 최신 내용이 커밋에 들어간다.
- `.gitignore`에 적힌 파일은 추적하지 않지만, 이미 추적 중인 파일은 `git rm --cached 파일명`으로 먼저 추적을 끊어야 한다.

<CommandLinks />
