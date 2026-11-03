# Git과 웹 배포: 2일 12차시

개발 입문 15일 차 학습자를 위한 과정이다. `index_v1.html`, `index_final.html`처럼 파일을 복사해 버전을 관리하던 습관을 Git으로 바꾼다. 내 컴퓨터에 변경 이력을 남기고, GitHub에 백업한 뒤, GitHub Pages로 실제 웹 주소에 공개한다. 둘째 날에는 Markdown 문서화, Issue 관리, 브랜치와 Pull Request로 동료와 협업하는 흐름을 익힌다.

## 과정을 마치면

- 웹페이지 변경을 커밋으로 남기고 이전 상태를 확인할 수 있다.
- GitHub에 코드를 백업하고 Pages 주소로 공개할 수 있다.
- README, TIL, Issue로 작업과 배운 점을 기록할 수 있다.
- 브랜치에서 실험하고 Pull Request로 `main`에 합칠 수 있다.

## 12차시 일정

각 차시는 수업 45분과 휴식 15분으로 끝난다. 점심은 양일 모두 12:00–13:00 고정이다. 강의 일정과 PDF 자산 정보를 D1에서 조회하는 [카탈로그](catalog.md)도 제공한다.

| 일자 | 차시 | 수업 45분 | 휴식 15분 | 주제 |
| :--- | :---: | :---: | :---: | :--- |
| Day 1 | 1차시 | 09:00–09:45 | 09:45–10:00 | [형상관리 입문과 도구 점검](01-environment.md) |
| Day 1 | 2차시 | 10:00–10:45 | 10:45–11:00 | [Git 설정과 로컬 저장소](02-local-repository.md) |
| Day 1 | 3차시 | 11:00–11:45 | 11:45–12:00 | [커밋과 이력 기록](03-commit-history.md) |
| Day 1 | 점심 | 12:00–13:00 | — | 고정 휴식 |
| Day 1 | 4차시 | 13:00–13:45 | 13:45–14:00 | [이력 수정과 파일 배제](04-amend-ignore.md) |
| Day 1 | 5차시 | 14:00–14:45 | 14:45–15:00 | [GitHub 원격 연동](05-remote.md) |
| Day 1 | 6차시 | 15:00–15:45 | 15:45–16:00 | [GitHub Pages 배포](06-pages.md) |
| Day 2 | 7차시 | 09:00–09:45 | 09:45–10:00 | [Markdown과 Mermaid](07-markdown-mermaid.md) |
| Day 2 | 8차시 | 10:00–10:45 | 10:45–11:00 | [프로필과 지속적 기록](08-profile-records.md) |
| Day 2 | 9차시 | 11:00–11:45 | 11:45–12:00 | [Issue, Label, Milestone](09-issues.md) |
| Day 2 | 점심 | 12:00–13:00 | — | 고정 휴식 |
| Day 2 | 10차시 | 13:00–13:45 | 13:45–14:00 | [브랜치와 태그](10-branches-tags.md) |
| Day 2 | 11차시 | 14:00–14:45 | 14:45–15:00 | [병합과 충돌 해결](11-merge-conflicts.md) |
| Day 2 | 12차시 | 15:00–15:45 | 15:45–16:00 | [Pull Request와 협업](12-pull-request.md) |

```mermaid
flowchart TD
    S1["1차시<br/>도구 점검과 세 영역"] --> S2["2차시<br/>저장소와 첫 파일"]
    S2 --> S3["3차시<br/>커밋과 이력"]
    S3 --> L1["점심 12:00–13:00"]
    L1 --> S4["4차시<br/>이력 수정과 파일 배제"]
    S4 --> S5["5차시<br/>GitHub 원격 연동"]
    S5 --> S6["6차시<br/>Pages 배포"]
    S6 --> S7["7차시<br/>Markdown과 Mermaid"]
    S7 --> S8["8차시<br/>프로필과 기록"]
    S8 --> S9["9차시<br/>Issue와 Milestone"]
    S9 --> L2["점심 12:00–13:00"]
    L2 --> S10["10차시<br/>브랜치와 태그"]
    S10 --> S11["11차시<br/>병합과 충돌"]
    S11 --> S12["12차시<br/>Pull Request"]
    S12 -.-> BUF["남는 2시간<br/>심화 실습 · 복습 퀴즈 · 에이전트 주도 Git"]
```

## 남는 2시간 활용

12차시 12시간(720분, 점심 제외)과 별도로 2시간 버퍼를 둔다. 설치·네트워크 장애와 진도 지연을 먼저 흡수하고, 남은 시간만 보충에 쓴다. 2시간을 확정 추가 수업으로 정하지 않으며, 파트별 고정 시간도 두지 않는다. 개별 학습으로 진행할지, 강사와 함께 추가 실습을 할지 현장에서 정한다.

| 남은 시간 | 가능한 조합 예시 |
| :---: | :--- |
| 15분 | README 링크 1개 확인, 퀴즈 3문항 |
| 30분 | README 보완 1개, 스타일 조정 1개 |
| 60분 | 심화 실습 2개, 복습 퀴즈 6문항 |
| 120분 | 심화 실습 3개, 복습 퀴즈 10문항, 에이전트 주도 Git |

### 보충 3파트

1. [추가 심화 실습안](supplement/01-advanced-practice.md) — README, 스타일, Mermaid를 한 단계 더 다듬는다.
2. [복습용 퀴즈](supplement/02-review-quiz.md) — 10문항으로 Git 흐름을 점검한다.
3. [에이전트 주도 Git](supplement/03-agent-led-git.md) — 에이전트가 제안하고 학습자가 승인하는 경계를 익힌다.

## 부록

- [부록 1. Windows 자격 증명 삭제와 GitHub 재인증](appendix/01-authentication.md)
- [부록 2. Git 명령과 옵션 일람](appendix/02-git-options.md)
- [부록 3. 웹 보조 도구: 눈누·Bulma·Coolors](appendix/03-web-tools.md)
- [부록 4. Mermaid 시각화](appendix/04-mermaid.md)
- [부록 5. macOS와 Windows 사용 차이](appendix/05-os-differences.md)

## 문서 구조

```mermaid
flowchart TD
    L["docs/lecture"] --> C["01–12차시 문서<br/>01-environment.md … 12-pull-request.md"]
    L --> A["appendix/<br/>01-authentication.md … 05-os-differences.md"]
    L --> S["supplement/<br/>01-advanced-practice.md … 03-agent-led-git.md"]
```

## 준비물과 안전 규칙

- VS Code, Git, 터미널(Windows Git Bash 또는 macOS 터미널), GitHub 계정, OpenCode를 준비한다.
- 눈누, Bulma, Coolors는 선택 참고 도구이다. 필수 설치가 아니며 [부록 3](appendix/03-web-tools.md)에서 라이선스와 사용 범위를 확인한다.
- 모든 명령은 별도 교육용 폴더에서 한 줄씩 실행한다. 오류가 나면 다음 명령을 이어서 실행하지 않는다.
- 토큰, 비밀번호, 개인정보를 채팅·파일·Issue에 남기지 않는다.
- `reset --hard`, `push --force`, `clean -fd`, 브랜치 강제 삭제는 수업에서 실행하지 않는다.
- 원격 push는 교육용 저장소인지 확인하고 실행한다. 인증 창은 학습자가 직접 처리한다.
- OS별 경로와 인증 저장소가 다르면 [부록 5](appendix/05-os-differences.md)를 먼저 확인한다.
