---
subtitle: "풀 리퀘스트를 열어 리뷰하고 병합한다."
tags: ["Pull Request", "branch", "push"]
day: 2
schedule: "15:00–15:45 (수업 45분) / 15:45–16:00 (휴식 및 피날레 15분)"
---

# 풀 리퀘스트와 협업

## 학습 목표

- 기능 브랜치를 원격에 push할 수 있다.
- GitHub 웹에서 [Pull Request](glossary.md#pull-request)를 만들 수 있다.
- Files changed에서 diff를 검토할 수 있다.
- PR을 병합할 수 있다.
- 로컬 `main`을 동기화하고 브랜치를 정리할 수 있다.
- Pages 사이트가 갱신되었는지 확인할 수 있다.

## 왜 필요한가

브랜치 보호 규칙을 설정하면 `main`에 직접 push하는 일을 제한할 수 있다. Pull Request(PR)는 브랜치에서 만든 변경의 검토와 병합을 제안하는 절차다. 동료의 리뷰로 변경 의도와 오류를 함께 확인한다.

<Illustration name="review" alt="동료들이 문서에서 바뀐 부분을 함께 보며 검토하는 모습" />

## 핵심 개념

- **Pull Request**는 브랜치 변경을 기본 브랜치에 반영해 달라고 제안하는 절차다.
- **diff**는 변경 전후 코드 차이를 보여 주는 비교 결과다.
- **셀프 리뷰**는 혼자 작업할 때도 PR diff를 읽고 변경 의도를 확인하는 습관이다.
- **Merge PR**은 검토가 끝난 변경을 기본 브랜치에 합치는 단계다.
- **동기화**는 원격에서 병합된 내용을 `git pull`로 로컬에 가져오는 일이다.
- **브랜치 정리**는 다 쓴 브랜치를 삭제해 저장소를 깔끔하게 유지하는 일이다.

### 이슈와 협업

이슈의 Assignees에서 담당자를 지정한다. PR 본문에 `Closes #7`처럼 이슈 번호를 적고 기본 브랜치에 병합하면 연결된 이슈가 닫힌다. 직접 이슈 화면에서 Close issue를 눌러 닫을 수도 있다. 저장소 설정에서 collaborator를 초대하면 수락한 사람에게 저장소 권한을 줄 수 있다. contributor는 기여 이력이 있는 사람으로, collaborator 권한과는 다르다. 초대와 권한, fork와 팀 구성은 [GitHub 협업](appendix/14-github-collaboration.md)을 참고한다.

### PR 전체 흐름

브랜치 push부터 병합, 동기화, 브랜치 정리까지의 전체 흐름

<Illustration name="prflow" alt="푸시, PR 생성, 리뷰와 수정, 병합, 로컬 동기화, 브랜치 정리의 여섯 단계" />

<a href="https://raw.githubusercontent.com/qus0in-factory/learn/20056c9d5ce381574c260bca370566f4d1604fea/review-assets/83-pr-flow-v2.png" target="_blank" rel="noopener noreferrer">원본 크게 보기 (새 창)</a>

## 따라하기

1. 새 브랜치 `feature/final-polish`를 만든다.
2. OpenCode에 명사형 프롬프트를 입력해 최종 스타일 수정 초안을 받는다.
3. 실제 변경이 발생했는지 `git status`와 `git diff`로 확인한다.
4. 변경이 없으면 `index.html` 소개 문구 한 줄을 직접 수정한다.
5. 변경을 stage 하고 커밋한다.
6. 브랜치를 원격에 push 한다.
7. GitHub 저장소 웹 페이지에서 `Compare & pull request`를 클릭한다.
8. PR 제목과 본문을 작성하고 `Create pull request`를 클릭한다.
9. `Files changed` 탭에서 diff를 확인하고 셀프 리뷰 코멘트를 작성한다. 함께 작업한다면 `Reviewers`에서 리뷰를 요청하고 피드백을 확인해 수정한다. 자세한 절차는 [GitHub 협업](appendix/14-github-collaboration.md#pr-리뷰)을 참고한다.
10. `Merge pull request` → `Confirm merge`를 클릭한다.
11. 로컬 터미널로 돌아와 `main`으로 전환한다.
12. `git pull origin main`으로 병합 내용을 받는다.
13. 다 쓴 브랜치를 삭제한다.
14. Pages 사이트를 확인한다.

## Git 명령

명령 이름이 어떤 뜻인지 알면 외우기 쉽다.

- Pull Request: 내 브랜치의 변경을 가져가(pull) 합쳐 달라고 요청(request)한다는 뜻

명령어 참조: [git add](commands/add.md) · [git commit](commands/commit.md) · [git diff](commands/diff.md) · [git push](commands/push.md) · [git pull](commands/pull.md) · [git branch](commands/branch.md) · [git switch](commands/switch.md)

```bash
git switch -c feature/final-polish
```

변경 코드:

```html
<!-- index.html의 </main> 앞에 추가 -->
<p>최종 포트폴리오 스타일을 다듬었습니다.</p>
```

```bash
git diff
git add index.html
git commit -m "feat: 최종 포트폴리오 스타일 다듬기"
git push -u origin feature/final-polish
git switch main
git pull origin main
git branch -d feature/final-polish
```

## 선택 참고 명령

```bash
gh pr create --base main --head feature/final-polish
gh pr diff
```

## 에이전트 요청 예시

```text
PR 본문 목적, 변경, 확인 결과, 남은 한계 작성
PR diff 목적·안전·재현성 기준 검토
```

## PR 본문 예시

```markdown
## 목적
최종 포트폴리오 스타일을 다듬는다.

## 변경 내용
- `index.html` 소개 문구 1줄 추가

## 확인 결과
- 로컬 브라우저에서 문구가 보인다.
- `git diff`에서 의도한 1줄만 변경되었다.

## 남은 한계
- 반응형 레이아웃은 다음 작업으로 남긴다.
```

## 체크리스트

- [ ] GitHub에 Merged PR이 보인다.
- [ ] `git pull` 후 `git status`가 깨끗하다.
- [ ] `git log --oneline`에 병합 커밋이 보인다.
- [ ] Pages 사이트가 갱신되었다.
- [ ] PR 본문에 비밀 값이 없다.

## 트러블 슈팅

| 증상 | 원인 | 대응 |
| --- | --- | --- |
| PR 버튼이 보이지 않음 | push 미완료 | push 후 페이지를 새로고침한다 |
| 병합 충돌 | 원격 변경과 충돌 | 로컬에서 해결 후 다시 push 한다 |
| PR 변경이 없음 | 실제 파일 수정이 발생하지 않음 | `index.html` 한 줄을 직접 수정하고 다시 커밋한다 |
| 브랜치 삭제 실패 | 병합 미완료 | PR 병합 후 `git pull origin main`을 먼저 실행한다 |

## 주의할 점

- PR 본문에 비밀 값, 토큰, 비밀번호를 적지 않는다.
- `push --force`로 PR 브랜치를 덮어쓰지 않는다.
- 실제 변경이 없는 PR은 만들지 않는다.
- 상세 명령 옵션은 [명령과 옵션 일람](appendix/02-git-options.md) 부록을 참고한다.

## 복습 퀴즈 <QuizHelp />

1. 브랜치의 변경을 기본 브랜치에 반영해 달라고 제안하는 절차는 ::Pull Request::다.
2. PR의 `Files changed` 탭에서는 변경 전후의 차이인 ::diff::를 검토한다.
3. PR 병합 뒤 로컬 `main`을 최신으로 맞추려면 `git` ::pull::을 실행한다.
