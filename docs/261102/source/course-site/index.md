# Git 중심 형상관리와 코딩 에이전트 활용

> Python 기초를 익힌 초보자가 작은 웹페이지를 만들고, 변경을 확인해 Git으로 기록한 뒤 GitHub에 공유하는 실습형 수업입니다.

## 수업 목표

- 작업 폴더, 스테이징, 커밋, 원격 저장소의 역할을 설명합니다.
- 에이전트가 바꾼 파일을 브라우저와 변경 내용으로 확인합니다.
- 변경을 커밋해 GitHub에 공유하고 Pages 결과를 확인합니다.
- Markdown으로 안내와 학습 기록을 작성하고 Branch·PR의 흐름을 익힙니다.

## 네 개의 3시간 실습 블록

각 블록은 45분 수업과 15분 휴식을 세 번 반복합니다. 세 번째 수업의 마지막 20분은 실습 15분과 퀴즈 5분입니다. 모든 실습은 [Windows 명령·설치 상세 안내](./git-guide)를 참고합니다.

| 순서 | 블록 | 주제 | 자료 |
| --- | --- | --- | --- |
| 1 | A | Git 기초와 첫 기록 | [안내·실습·퀴즈](./blocks/a) · <a href="/git/slides/5">슬라이드 5부터</a> |
| 2 | B | GitHub 원격 공유와 Pages | [안내·실습·퀴즈](./blocks/b) · <a href="/git/slides/8">슬라이드 8부터</a> |
| 3 | C | Markdown과 GitHub 기록 | [안내·실습·퀴즈](./blocks/c) · <a href="/git/slides/11">슬라이드 11부터</a> |
| 4 | D | Branch·병합·Pull Request | [안내·실습·퀴즈](./blocks/d) · <a href="/git/slides/14">슬라이드 14부터</a> |

## 수업 도구

Git은 로컬 변경 이력을 기록하고, GitHub는 원격 저장·협업·Pages 배포를 제공합니다. VS Code는 파일과 변경을 살펴보는 편집기이며 Git Bash는 Windows에서 명령을 실행합니다. 코딩 에이전트는 요청에 따라 파일을 바꿀 수 있지만 학습자는 결과를 브라우저와 diff에서 확인합니다. `gh`와 ChatGPT GitHub 연결은 선택 기능입니다.

## 변경을 기록하는 순서

```bash
git status
git add index.html
git status
git commit -m "소개 문구 수정"
git log --oneline
git push
```

`add`는 기록에 포함할 변경을 고르고, `commit`은 로컬 기록을 만들며, `push`는 원격에 공유합니다. 처음 실습에서는 한 줄씩 실행하고 매번 `status`를 읽습니다. 되돌리기 명령은 영향이 다르므로 상세 안내의 안전 설명을 먼저 읽습니다.

## 수업 운영

설치·인증 문제가 생기면 예제 저장소와 웹 화면 시연을 사용합니다. 일정이 밀리면 PR은 강사 시연으로 전환하고 Git 기록·원격 공유·Pages 확인을 우선합니다.
