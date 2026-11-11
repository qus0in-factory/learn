---
stepHeader: true
subtitle: "브랜치로 작업을 나누고 머지로 합친다."
tags: ["branch", "switch", "merge", "충돌"]
---

# 브랜치와 머지

{{ easyNotice }}

출처: [STEP 10 브랜치와 태그](/git/10-branches-tags), [STEP 11 병합과 충돌 해결](/git/11-merge-conflicts)

배포 중인 `main`에서 직접 실험하다 코드가 망가지면 사이트에도 영향을 준다. 독립된 가지인 [브랜치](/git/glossary#branch)로 나눠 작업하면 마음껏 실험하고, 성공했을 때만 메인에 합치면 된다.

## 브랜치 만들고 전환

```bash
git branch                    # 브랜치 목록, 현재 브랜치 확인
git switch -c feature/profile-design    # 새 브랜치 생성 + 이동
```

- `switch -c`: 새 브랜치를 만들면서 동시에 이동한다.
- `switch`: 기존 브랜치로 옮겨 간다.
- `main`으로 돌아오면 파일이 원래 내용으로 돌아온다(작업이 브랜치에 격리됨).

미커밋 변경이 남아 있을 때는 브랜치를 전환하지 않는다.

## 머지로 합치기

브랜치 작업을 커밋했다면 `main`에서 합친다.

```bash
git switch main
git merge feature/profile-design
```

- 기준 브랜치에 새 커밋이 없으면 포인터만 앞으로 이동하는 **Fast-forward 병합**이 된다.
- 양쪽에 새 커밋이 있으면 공통 조상을 바탕으로 합치는 **3-way 병합**이 되고 병합 커밋이 생긴다.

병합 후에는 `git branch -d feature/profile-design`으로 브랜치를 정리한다.

## 충돌 해결

두 브랜치가 같은 파일의 같은 위치를 다르게 고치면 Git이 자동으로 못 합치고 멈춘다.

1. `git merge` 실행 후 `CONFLICT` 경고를 확인한다.
2. 충돌 파일을 열면 `<<<<<<< HEAD`와 `>>>>>>> feature/...` 마커 사이에 양쪽 변경이 함께 들어 있다.
3. 두 변경의 의도를 읽고 범위를 정리해 마커를 모두 지운다.
4. `git add <파일>` → `git commit`으로 병합을 완료한다.
5. `git log --graph --oneline --all`로 갈라졌다가 합쳐진 흐름을 확인한다.

```text
<<<<<<< HEAD
main에서 고친 제목
=======
브랜치에서 고친 제목
>>>>>>> feature/profile-design
```

## 병합이 꼬이면

`git merge --abort`로 병합을 취소해 병합 전 상태로 돌아간다. 커밋된 상태에서 시작했다면 변경이 사라지지 않는다. 충돌을 `reset --hard`로 해결하거나 마커를 지우지 않은 채 커밋하지 않는다.
