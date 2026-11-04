---
command: init
subtitle: "폴더를 Git 저장소로 선언해 변경 추적을 시작한다."
stepRefs: ["02-local-repository", "appendix/02-git-options"]
---

# git init

## 용도

일반 폴더 안에 숨김 폴더 `.git`을 만들어 그 폴더를 Git 저장소로 선언한다. 이후 폴더 안의 파일 변경은 `git status`로 감지되고 `git add`·`git commit`으로 이력에 기록된다. `init`은 initialize(초기화)의 줄임말이다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| (없음) | 현재 폴더를 저장소로 초기화 | 수업에서는 옵션 없이 실행한다 |

## 예시

```bash
mkdir portfolio-web
cd portfolio-web
git init
git status
```

`git init`이 끝나면 `Initialized empty Git repository` 메시지가 나오고, `git status`가 아직 커밋이 없다고 알려 준다.

## 주의할 점

- 실습 폴더 안에서 실행한다. 홈 폴더나 바탕화면처럼 큰 폴더에서 실행하면 그 아래 모든 파일이 추적 대상이 된다.
- 이미 저장소인 폴더의 하위 폴더에서 다시 실행하지 않는다. 저장소가 겹쳐 상태 확인이 혼란스러워진다.
- `fatal: not a git repository` 오류는 `init`을 하지 않은 폴더에서 Git 명령을 실행했다는 뜻이다. `pwd`로 위치를 확인한 뒤 실습 폴더로 이동한다.
- `.git` 폴더를 지우면 모든 이력이 사라진다.

<CommandLinks />
