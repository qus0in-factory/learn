---
command: diff
subtitle: "커밋 전 변경 내용을 줄 단위로 비교한다."
stepRefs: ["03-commit-history", "11-merge-conflicts", "appendix/02-git-options"]
---

# git diff

## 용도

작업 공간의 파일이 마지막 커밋(또는 스테이징 영역)과 어떻게 다른지 줄 단위로 보여 준다. 삭제된 줄은 `-`와 빨간색, 추가된 줄은 `+`와 초록색으로 표시된다. 커밋하기 전에 의도한 변경만 들어 있는지 확인하는 명령이다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| (없음) | 작업 공간과 스테이징 영역의 차이 | `git add` 전 변경만 보인다 |
| `--staged` | 스테이징 영역과 마지막 커밋의 차이 | `git add` 뒤 커밋에 들어갈 내용 |
| `--cached` | `--staged`와 같은 뜻 | 옛 이름, 둘 다 사용 가능 |

## 예시

```bash
git diff
git add index.html
git diff --staged
```

`git add` 뒤에는 옵션 없는 `git diff`가 비어 보이고, 같은 변경이 `git diff --staged`로 옮겨 간다.

## 주의할 점

- `git diff`에 아무것도 나오지 않으면 파일을 저장하지 않았거나 이미 `git add`한 상태다. `git status`로 먼저 확인한다.
- 병합 충돌 중에는 `<<<<<<<`, `=======`, `>>>>>>>` 표시가 보인다. 표시를 모두 지운 뒤 다시 `git diff`로 확인하고 커밋한다.
- 에이전트가 고친 파일은 승인한 범위만 바뀌었는지 `git diff`로 읽고 넘어간다.

<CommandLinks />
