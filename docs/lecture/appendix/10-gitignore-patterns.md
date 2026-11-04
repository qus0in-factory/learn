---
subtitle: ".gitignore 패턴 문법과 추적 예외를 예시로 익힌다."
tags: [".gitignore", "패턴", "git rm --cached", "check-ignore", "Git"]
---

# .gitignore 패턴

관련 STEP: [STEP 04 되돌리기와 무시 규칙](../04-amend-ignore.md)

`.gitignore`는 Git이 추적하지 않을 파일을 적는 목록이다. 파일명 하나를 적을 수도 있고, 확장자·폴더·경로를 패턴으로 지정할 수도 있다. 이 부록은 수업에서 자주 쓰는 문법과 예외 처리만 정리한다.

## 학습 목표

- 주석·빈 줄·파일명·확장자·폴더 패턴을 구분한다.
- `*`·`?`·`[abc]`·`**`의 범위를 설명한다.
- 앞 `/`와 `!`의 의미를 알고 예외를 적용한다.
- 이미 추적 중인 파일을 `git rm --cached`로 제외한다.
- `git check-ignore -v`로 적용된 패턴을 확인한다.

## 왜 필요한가

비밀 키, 로그, 운영체제가 만든 파일을 실수로 커밋하면 저장소에 남는다. `.gitignore`에 패턴을 적어 두면 `git status`와 `git add`에서 이런 파일이 보이지 않는다. 패턴의 범위를 정확히 알면 필요한 파일까지 무시하는 실수를 줄일 수 있다.

## 핵심 개념

- `#`으로 시작하는 줄은 주석이다. 빈 줄은 무시된다.
- `*.log`는 이름이 `.log`로 끝나는 모든 파일을 뜻한다.
- `build/`처럼 끝에 `/`를 붙이면 폴더와 그 안의 파일을 함께 무시한다.
- `/todo.txt`처럼 앞에 `/`를 붙이면 저장소 루트의 `todo.txt`만 대상으로 한다. 하위 폴더의 `todo.txt`는 무시하지 않는다.
- `*`는 슬래시를 제외한 글자 여러 개, `?`는 글자 하나, `[abc]`는 괄호 안 글자 하나를 뜻한다.
- `**`는 하위 폴더를 포함한다. `docs/**/draft.md`는 `docs` 아래 어느 폴더의 `draft.md`든 무시한다.
- `!`로 시작하는 줄은 앞에서 무시한 파일을 다시 포함한다. 예를 들어 `*.log` 뒤에 `!keep.log`를 두면 `keep.log`는 추적 대상이 된다.
- 상위 폴더가 무시되면 그 안의 파일을 `!`로 다시 포함할 수 없다. 이때는 상위 폴더를 먼저 무시하지 않도록 패턴을 나눈다.
- `.gitignore`는 아직 추적하지 않은 파일에만 적용된다. 이미 `git add`나 커밋으로 추적 중인 파일은 `.gitignore`에 적어도 계속 추적된다.
- 이미 추적 중인 파일은 `git rm --cached <파일명>`으로 인덱스에서만 제거한다. 작업 파일은 그대로 남는다.
- `git check-ignore -v <경로>`는 어떤 패턴이 적용됐는지 파일과 줄 번호까지 보여 준다.

## 예시 표

| 패턴 | 뜻 | 매칭 예 |
| --- | --- | --- |
| `*.log` | 이름이 `.log`로 끝나는 모든 파일 | `app.log`, `logs/error.log` |
| `build/` | `build` 폴더와 그 안의 파일 | `build/index.html` |
| `/todo.txt` | 저장소 루트의 `todo.txt`만 | `todo.txt` |
| `docs/**/draft.md` | `docs` 아래 모든 폴더의 `draft.md` | `docs/a/draft.md` |
| `log?.txt` | `?` 자리에 글자 하나 | `log1.txt`, `logA.txt` |
| `log[ab].txt` | `[ab]` 중 한 글자 | `loga.txt`, `logb.txt` |
| `!keep.log` | 앞에서 무시한 `keep.log`를 다시 포함 | `*.log` 뒤에 둘 때 |
| `secrets/` | `secrets` 폴더와 그 안의 파일 | `secrets/key.txt` |

## 확인 방법

```text
# 무시 여부와 적용된 패턴 확인
git check-ignore -v app.log

# 이미 추적 중인 파일을 인덱스에서 제거
git rm --cached .env
git commit -m "chore: 추적하지 않을 환경 파일 제거"
```

- `git check-ignore -v`가 아무것도 출력하지 않으면 그 경로는 무시되지 않는다.
- `git rm --cached`는 인덱스에서만 제거한다. 작업 폴더의 파일은 지우지 않는다.
- 폴더를 통째로 제거하려면 `git rm -r --cached <폴더>`를 쓴다.

## 체크리스트

- [ ] 주석과 빈 줄이 패턴으로 해석되지 않는지 확인했다.
- [ ] `*.log`와 `build/`의 차이를 설명할 수 있다.
- [ ] 앞 `/`가 저장소 루트를 기준으로 한다는 점을 안다.
- [ ] `!` 예외를 적용했고, 상위 폴더가 무시되지 않는지 확인했다.
- [ ] 이미 추적 중인 파일을 `git rm --cached`로 제거했다.
- [ ] `git check-ignore -v`로 적용된 패턴을 확인했다.

## 주의할 점

- `.gitignore`는 이미 추적 중인 파일에는 적용되지 않는다. 먼저 `git rm --cached`로 인덱스에서 제거한다.
- `build/`처럼 상위 폴더를 무시한 뒤 `!build/keep.txt`를 적어도 `keep.txt`는 다시 포함되지 않는다. `build/*`와 `!build/keep.txt`처럼 나눈다.
- `!`는 앞에서 무시한 대상을 다시 포함할 때만 쓴다. 순서가 바뀌면 결과도 달라진다.
- `*.log`는 `logs/` 폴더의 로그도 무시한다. 폴더만 무시하려면 `logs/`를 쓴다.
- 운영체제·편집기·비밀 키 패턴을 프로젝트 성격에 맞게 고른다. 다른 프로젝트의 파일을 그대로 복사하지 않는다.
- 비밀번호와 토큰이 이미 커밋됐다면 `.gitignore`만으로 해결되지 않는다. 해당 값을 폐기하고 이력 정리 여부를 강사와 상의한다.

## 핵심 내용 퀴즈 <QuizHelp />

1. 폴더와 그 안의 파일을 함께 무시하려면 폴더 이름 뒤에 ::/::를 붙인다.
2. 앞에서 무시한 파일을 다시 포함할 때 줄 앞에 붙이는 기호는 ::!::이다.
3. 이미 추적 중인 파일을 인덱스에서 제거하는 명령은 ::git rm --cached::이다.

## 참고 자료

- [Git 공식 문서 gitignore](https://git-scm.com/docs/gitignore)
- [GitHub gitignore 템플릿 저장소](https://github.com/github/gitignore)
