---
command: status
subtitle: "작업 공간과 스테이징 영역의 현재 상태를 확인한다."
stepRefs: ["02-local-repository", "03-commit-history", "appendix/02-git-options"]
---

# git status

## 용도

현재 브랜치, 추적되지 않은 파일, 수정된 파일, 커밋 대기 중인 파일을 한눈에 보여 준다. 다른 Git 명령을 실행하기 전과 후에 가장 먼저 실행하는 확인 명령이다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| (없음) | 전체 상태를 설명과 함께 출력 | 수업에서는 옵션 없이 실행한다 |

출력에서 읽어야 할 세 가지 구역은 아래와 같다.

| 구역 | 뜻 | 다음 행동 |
| --- | --- | --- |
| `Untracked files` (빨간색) | Git이 아직 추적하지 않는 새 파일 | `git add 파일명` |
| `Changes not staged for commit` (빨간색) | 추적 중인 파일이 수정됨 | `git diff`로 확인 후 `git add` |
| `Changes to be committed` (초록색) | 다음 커밋에 들어갈 파일 | `git commit -m "메시지"` |

## 예시

```bash
git status
git add index.html
git status
```

첫 번째 `git status`에서 빨간색이던 `index.html`이 `git add` 뒤에는 초록색 `Changes to be committed` 목록으로 올라간다.

## 주의할 점

- 파일이 보이지 않으면 VS Code에서 저장했는지, 현재 폴더가 저장소 폴더인지 먼저 확인한다.
- `nothing to commit, working tree clean`은 모든 변경이 커밋된 상태라는 뜻이다. 커밋 직후와 수업을 마칠 때 이 상태인지 확인한다.
- 에이전트가 "커밋했다"고 설명해도 `git status`와 `git log`로 직접 확인한다.

<CommandLinks />
