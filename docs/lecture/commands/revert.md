---
command: revert
subtitle: "이력을 지우지 않고 특정 커밋의 변경을 반대로 적용하는 새 커밋을 만든다."
stepRefs: ["04-amend-ignore", "appendix/02-git-options"]
---

# git revert

## 용도

지정한 커밋이 바꾼 내용을 거꾸로 적용하는 새 커밋을 추가한다. 원래 커밋은 이력에 남으므로 이미 push해 공유한 변경을 되돌릴 때 안전하다. 배포 뒤 문제가 된 커밋을 되돌리는 표준 방법이다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| `HEAD` | 직전 커밋을 되돌리는 커밋 생성 | 메시지 편집기가 열린다 |
| `해시` | 특정 커밋을 되돌리는 커밋 생성 | `git log --oneline`의 7자리 해시 |

## 예시

```bash
git log --oneline
git revert HEAD
git log --oneline
```

편집기가 열리면 기본 메시지(`Revert "..."`)를 저장하고 닫는다. 두 번째 `git log --oneline`에 원래 커밋과 revert 커밋이 모두 보인다.

## 주의할 점

- 편집기는 vi다. 메시지를 그대로 쓰려면 `Esc` 뒤 `:wq`로 저장하고 나온다.
- revert 뒤에는 `git push`로 원격에도 반영해야 배포가 되돌아간다. push는 승인 뒤 실행한다.
- 공유된 커밋은 `reset`이나 `--amend`로 지우지 않는다. `revert`만 이력을 보존한다.
- 되돌린 이유는 Issue나 커밋 메시지에 남겨 다음 작업자가 알 수 있게 한다.

<CommandLinks />
