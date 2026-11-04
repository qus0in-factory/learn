---
command: remote
subtitle: "로컬 저장소에 GitHub 원격 저장소 주소를 등록하고 확인한다."
stepRefs: ["05-remote", "appendix/02-git-options"]
---

# git remote

## 용도

로컬 저장소가 push·pull할 원격 저장소의 주소를 이름(보통 `origin`)으로 등록하고 확인한다. GitHub에 만든 빈 저장소와 내 컴퓨터의 저장소를 연결하는 첫 단계다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| `add origin 주소` | `origin`이라는 이름으로 원격 주소 등록 | 저장소당 한 번 |
| `-v` | 등록된 원격 이름과 주소 출력 | fetch·push 두 줄이 나온다 |
| `set-url origin 주소` | 이미 등록한 `origin` 주소 교체 | 주소를 잘못 넣었을 때 |
| `remove 이름` | 등록한 원격 삭제 | 이름을 잘못 만들었을 때 다시 `add`한다 |
| `rename 옛이름 새이름` | 원격 이름 변경 | 이름 오타(`orgin` 등)를 고칠 때 |

## 예시

```bash
git remote add origin https://github.com/본인계정/portfolio-web.git
git remote -v
```

`git remote -v`에 `origin`으로 시작하는 fetch·push 두 줄이 같은 GitHub 주소로 나오면 연결된 것이다.

## 주의할 점

- `fatal: remote origin already exists`는 이미 `origin`이 있다는 뜻이다. `git remote -v`로 주소를 확인하고 틀렸다면 `git remote set-url origin 주소`로 고친다.
- 주소는 GitHub 저장소 페이지의 Code 버튼에서 복사한다. `본인계정` 부분을 그대로 두지 않는다.
- 등록만으로는 아무것도 전송되지 않는다. 실제 업로드는 `git push`가 한다.
- 철자·이름·주소를 잘못 입력했을 때의 대응은 [STEP 05의 원격 등록 실수 대응](../05-remote.md#원격-등록-실수-대응)을 참고한다.

<CommandLinks />
