---
command: commit
subtitle: "스테이징한 변경을 메시지와 함께 스냅샷으로 기록한다."
stepRefs: ["03-commit-history", "04-amend-ignore", "appendix/02-git-options"]
---

# git commit

## 용도

스테이징 영역에 올린 파일 상태를 하나의 스냅샷으로 로컬 저장소에 기록한다. 각 커밋은 고유한 해시, 작성자, 시각, 메시지를 가지며 `git log`로 돌아볼 수 있다. 메시지는 무엇을 왜 바꿨는지 한 줄로 남긴다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| `-m "메시지"` | 커밋 메시지를 명령줄에서 바로 입력 | 생략하면 vi 편집기가 열린다 |
| `--amend` | 직전 커밋을 새 내용·메시지로 교체 | 공유(push) 전 커밋에만 사용 |
| `-am "메시지"` | 추적 중인 파일의 변경을 자동 스테이징 후 커밋 | 새 파일은 포함하지 않는다 |

## 예시

```bash
git add index.html style.css
git commit -m "feat: 첫 웹페이지 레이아웃 및 스타일 추가"
git log --oneline
git commit --amend -m "feat: 첫 웹페이지 레이아웃과 스타일 추가"
```

마지막 줄은 직전 커밋의 메시지만 고친다. `git log --oneline`에서 해시가 새로 바뀐 것을 확인한다.

## 주의할 점

- `-m`을 빠뜨려 vi가 열리면 `Esc`를 누른 뒤 `:q!`로 취소하거나 `:wq`로 저장하고 나온다.
- 메시지는 `feat:`, `fix:`, `docs:`, `style:`, `chore:`처럼 종류를 앞에 붙이고 한 가지 변경만 담는다.
- `--amend`는 이미 push한 커밋에 쓰지 않는다. 공유된 이력을 고칠 때는 `git revert`를 쓴다.
- `-am`은 새 파일을 담지 않는다. 새 파일은 `git add`가 필요하다.

<CommandLinks />
