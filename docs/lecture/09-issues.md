# 9차시. Issue, Label, Milestone

Day 2 · 11:00–11:45 (수업 45분) / 11:45–12:00 (휴식 15분)  
저장소: `portfolio-web`  
선수: 8차시 프로필과 기록

## 이 차시에서 하는 일

- GitHub Issue로 작업 요청서를 등록한다.
- Label로 이슈 종류를 분류한다.
- Milestone으로 목표와 진행률을 추적한다.
- GitHub CLI(`gh`)와 ChatGPT-GitHub 연동을 선택 기능으로 이해한다.
- 비밀 값을 Issue에 남기지 않는다.

## 왜 필요한가

개발할 기능이나 고쳐야 할 버그를 머릿속으로만 생각하면 중요한 작업을 빠뜨리게 된다. GitHub Issue를 활용하면 할 일을 카드 형태로 만들고, 색상 라벨로 분류하며, 목표 마감일(Milestone)별로 진척도를 시각적으로 추적할 수 있다.

## 핵심 개념

- **Issue**: 작업 요청서 및 버그 리포트 티켓이다.
- **Label**: 이슈의 종류(`bug`, `enhancement`, `documentation`)를 나타내는 색상 태그다.
- **Milestone**: 목표 스프린트와 소속 이슈들의 해결률을 게이지 바로 표시한다.
- **GitHub CLI (`gh`)**: 터미널에서 `gh issue list` 등을 실행하는 공식 CLI 도구다. 설치와 인증은 선택 사항이다.
- **ChatGPT-GitHub 연동**: 저장소 코드를 AI로 질의하는 기능이다. 권한과 보안을 먼저 확인한다.

## 따라하기

1. GitHub 저장소 웹 페이지의 `Issues` 탭을 연다.
2. `Milestones` 메뉴로 들어가 `v1.0 포트폴리오 완성` 마일스톤을 만든다.
3. 새 이슈 2건을 등록한다.
   - 1건: `[기능] 다크모드 토글 버튼 추가` (Label: `enhancement`, Milestone 할당)
   - 1건: `[문서] README에 라이선스 표기 보완` (Label: `documentation`, Milestone 할당)
4. Milestones 탭에서 0% 진척도 게이지를 확인한다.
5. 강사 시연으로 `gh issue list` 명령을 관찰한다.
6. 필요하면 ChatGPT-GitHub 연동의 역할과 보안 주의점을 이해한다.

## Git/CLI 명령

```bash
gh issue list --repo 계정이름/portfolio-web
```

## 에이전트 요청 예시

```text
Issue 초안 작성: 목적, 하지 않을 일, 완료 조건 3개 제안
Label과 Milestone 차이 설명
```

## Issue 초안 예시

```markdown
## 목적
다크모드 토글 버튼을 추가한다.

## 하지 않을 일
- 전체 테마 시스템 재작성
- 외부 라이브러리 도입

## 완료 조건
- [ ] 토글 버튼이 화면에 보인다.
- [ ] 클릭 시 배경색이 바뀐다.
- [ ] README에 사용법이 적혀 있다.
```

## 확인법

- [ ] Issues 목록에 라벨 색상이 입혀진 티켓이 2개 이상 있다.
- [ ] Milestone 게이지가 표시된다.
- [ ] Issue 본문에 비밀 값이 없다.
- [ ] `gh`가 실패해도 브라우저에서 같은 작업을 수행할 수 있다.

## 오류 복구

| 증상 | 원인 | 대응 |
| --- | --- | --- |
| `gh` 명령 실패 | CLI 미설치 또는 인증 안 됨 | 브라우저로 동일 작업을 수행한다 |
| Issue 권한 없음 | 저장소 권한 부족 | 개인 저장소에서 재시도한다 |
| Milestone이 보이지 않음 | 메뉴 위치를 찾지 못함 | 저장소 `Issues` 탭의 `Milestones` 메뉴를 다시 확인한다 |
| Label이 적용되지 않음 | Label 미생성 | `Labels` 메뉴에서 먼저 Label을 만든다 |

## 정보 누출 방지

- Issue와 PR 본문에 비밀 값, 토큰, 비밀번호를 적지 않는다.
- `gh`와 ChatGPT-GitHub 연동은 선택 심화이며 필수 설치 대상이 아니다.
- AI 연동 시 저장소 권한 범위를 확인한다.
- 추가 심화는 [보충안 심화](supplement/01-advanced-practice.md), 복습 퀴즈는 [보충안 퀴즈](supplement/02-review-quiz.md), 에이전트 주도 Git은 [보충안 에이전트](supplement/03-agent-led-git.md)에서 다룬다.
