---
stepHeader: true
subtitle: "브랜치를 만들어 작업을 나누고 병합한다."
tags: ["branch", "switch", "merge", "충돌"]
---

# 브랜치와 머지

배포 중인 `main`에서 직접 실험하다 코드가 망가지면 사이트에도 영향을 준다. 독립된 가지인 [브랜치](/git/glossary#branch)로 나눠 작업하면 마음껏 실험하고, 성공했을 때만 메인에 합치면 된다.

## 브랜치 생성과 전환

```bash
git branch                    # 브랜치 목록, 현재 브랜치 확인
git switch -c feature/profile-design    # 새 브랜치 생성 + 이동
```

- `switch -c`: 새 브랜치를 만들면서 동시에 이동한다.
- `switch`: 기존 브랜치로 옮겨 간다.
- `main`으로 돌아오면 파일이 원래 내용으로 돌아온다(작업이 브랜치에 격리됨).

미커밋 변경이 남아 있을 때는 브랜치를 전환하지 않는다.

## 머지로 병합

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

## 병합 취소

`git merge --abort`로 병합을 취소해 병합 전 상태로 돌아간다. 커밋된 상태에서 시작했다면 변경이 사라지지 않는다. 충돌을 `reset --hard`로 해결하거나 마커를 지우지 않은 채 커밋하지 않는다.

## GitHub 웹에서 PR 병합

실제 협업에서는 브랜치를 `main`에 직접 머지하지 않고, GitHub 웹에서 풀 리퀘스트(PR)로 올려 검토한 뒤 합친다. 흐름은 [STEP 12 풀 리퀘스트와 협업](/git/12-pull-request)을 따른다.

1. 브랜치에서 작업을 커밋한 뒤 원격에 올린다.

```bash
git push -u origin feature/profile-design
```

2. 브라우저에서 내 저장소 페이지를 열면 노란 배너의 `Compare & pull request` 버튼이 보인다. 누른다. 사라졌다면 `Contribute` → `Open pull request`로 열 수 있다.
3. PR 제목과 설명을 확인하고 `Create pull request`를 누른다.
4. `Files changed` 탭에서 바뀐 부분(diff)을 확인한다.
5. `Merge pull request` → `Confirm merge`를 눌러 병합한다. 변경이 양쪽에서 겹치면 웹에서도 충돌 해결을 요구한다.
6. 로컬 터미널로 돌아와 받아 둔다.

```bash
git switch main
git pull origin main
```

7. GitHub의 녹색 `Delete branch` 버튼으로 병합된 브랜치를 정리한다. 로컬에서는 `git branch -d feature/profile-design`으로 지운다.

## 추가자료

- [STEP 10 브랜치와 태그](/git/10-branches-tags)
- [STEP 11 병합과 충돌 해결](/git/11-merge-conflicts)
