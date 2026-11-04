---
command: push
subtitle: "로컬 커밋을 원격 저장소에 올린다."
stepRefs: ["05-remote", "06-pages", "12-pull-request", "appendix/02-git-options"]
---

# git push

## 용도

로컬 저장소의 커밋을 GitHub 원격 저장소로 보낸다. 첫 push에서 `-u`로 로컬 브랜치와 원격 브랜치를 연결해 두면 이후에는 `git push`만으로 같은 곳에 올라간다. GitHub Pages는 push된 내용을 받아 사이트를 갱신한다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| `-u origin main` | 첫 업로드와 함께 업스트림 연결 | 저장소당 브랜치마다 한 번 |
| `origin main` | 원격 `origin`의 `main`으로 명시 push | 업스트림이 없어도 동작 |
| (없음) | 연결된 업스트림으로 push | `-u`를 한 번 한 뒤 |
| `-u origin 브랜치명` | 새 작업 브랜치를 처음 올릴 때 | Pull Request 전 단계 |

## 예시

```bash
git push -u origin main
git push
git push -u origin feature/final-polish
```

첫 줄은 `main`을 처음 올리며 연결하고, 둘째 줄부터는 짧게 쓴다. 셋째 줄은 작업 브랜치를 올려 GitHub에서 Pull Request를 만들 준비를 한다.

## 주의할 점

- push가 거절되면 원인과 원격 이력을 확인한다. 별도 초기 커밋이 있는 경우 [STEP 05](../05-remote.md#초기-이력과-오류)를 참고한다.
- `--force`(`-f`)는 원격 이력을 덮어써 작업을 잃을 수 있다. `--force-with-lease`는 마지막으로 확인한 원격 상태와 다르면 거절하지만, 그 상태를 이미 가져왔거나 lease 기준을 잘못 지정하면 덮어쓸 수 있어 무조건 안전하지 않다. 수업에서는 둘 다 실행하지 않는다.
- 에이전트에게 맡길 때는 push 전에 브랜치·원격·커밋 해시를 확인하고 명시적으로 승인한다.
- 처음 push할 때 GitHub 인증 창이 뜨면 학습자가 직접 로그인한다.

<CommandLinks />
