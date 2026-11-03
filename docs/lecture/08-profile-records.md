---
subtitle: "프로필과 작업 기록을 남긴다."
tags: ["README", "TIL", "Post-mortem"]
day: 2
schedule: "10:00–10:45 (수업 45분) / 10:45–11:00 (휴식 15분)"
---

# 프로필과 작업 기록

## 학습 목표

- GitHub Profile 저장소를 별도 저장소로 만든다.
- 포트폴리오 저장소와 Profile 저장소를 구분한다.
- `docs/post-mortem.md`를 만들어 사후분석을 기록한다.
- TIL, KPT 회고, Wiki의 쓰임을 안다.
- 변경을 커밋하고 원격에 반영한다.

## 왜 필요한가

개발 학습 15일 차를 넘어가면 배운 내용이 머릿속에서 뒤섞이기 시작한다. 에러를 만났을 때 해결 과정을 기록해 두지 않으면 다음번에 같은 에러로 시간을 허비하게 된다. 실패와 에러를 개인의 탓으로 돌리지 않고 원인과 해결책을 차분히 정리하는 사후분석(Post-mortem) 문서는 개발자를 가장 빠르게 성장시키는 자산이다.

## 핵심 개념

- **Profile 저장소**: GitHub 계정 ID와 정확히 같은 이름의 저장소(`<계정ID>/<계정ID>`)다. 이 저장소의 README는 프로필 첫 화면에 명함처럼 노출된다.
- **작업 저장소**: `portfolio-web`은 실제 포트폴리오 코드와 문서를 담는 저장소다.
- **TIL (Today I Learned)**: 오늘 알게 된 점을 짧게 기록한다.
- **Post-mortem**: 발생 상황, 원인 분석, 조치 내용, 재발 방지책을 정리한다.
- **KPT 회고**: Keep(좋았던 점), Problem(어려웠던 점), Try(다음에 시도할 점)으로 나눈다.
- **GitHub Wiki**: 코드 저장소와 분리하여 매뉴얼이나 용어집을 웹에서 정리하는 탭 기능이다.

## 따라하기

1. `portfolio-web` 폴더가 현재 작업 저장소임을 확인한다.
2. GitHub 웹에서 본인 계정 ID와 정확히 같은 이름의 새 저장소 `<계정ID>/<계정ID>`를 만든다.
3. Profile 저장소 README에 본인 소개 문구와 관심 기술을 작성하고 커밋한다.
4. `portfolio-web`으로 돌아와 `docs` 폴더를 만든다.
5. `docs/post-mortem.md` 파일을 만들고 사후분석 예시를 작성한다.
6. `git status`로 변경 파일을 확인한다.
7. `git add docs/post-mortem.md`로 stage 한다.
8. 커밋한다.
9. `git push origin main`으로 `portfolio-web`에 반영한다.
10. GitHub Wiki 탭을 확인한다. 지원되지 않으면 `notes/wiki-draft.md`로 대체한다.

## Git 명령

```bash
mkdir -p docs
printf '# 에러 사후분석\n- 현상: ...\n- 원인: ...\n- 조치: ...\n- 재발 방지: ...\n' > docs/post-mortem.md
git status
git add docs/post-mortem.md
git commit -m "docs: 사후분석 문서 추가"
git push origin main
```

## Post-mortem 예시

```markdown
# 에러 사후분석

## 1. 발생 상황
- `git commit` 입력 후 터미널이 멈춤

## 2. 원인 분석
- `-m` 옵션을 빼먹어 vi 편집기가 실행됨

## 3. 조치 내용
- `Esc` 후 `:wq` 입력

## 4. 재발 방지책
- 항상 `git commit -m "메시지"` 사용
```

## TIL과 KPT 예시

```markdown
# TIL
- `git reset <파일명>`은 커밋을 지우지 않고 stage만 해제한다.
- Profile 저장소 이름은 계정 ID와 정확히 일치해야 한다.

# KPT 회고
- Keep: status와 diff를 먼저 확인하는 습관
- Problem: vi 편집기에 갇혀 시간을 잃음
- Try: 커밋 전 명령어 옵션을 한 번 더 확인
```

## 에이전트 요청 예시

```text
TIL 한 단락과 회고 한 단락 구분 작성
Post-mortem 템플릿 작성
Profile 저장소와 작업 저장소 차이 설명
```

## 체크리스트

- [ ] `https://github.com/<계정ID>` 접속 시 프로필 소개 카드가 노출된다.
- [ ] `portfolio-web` 저장소에 `docs/post-mortem.md`가 있다.
- [ ] `git status`가 깨끗하다.
- [ ] Profile 저장소와 `portfolio-web` 저장소를 구분해서 말할 수 있다.
- [ ] Wiki 또는 대체 문서 위치를 확인했다.

## 트러블 슈팅

| 증상 | 원인 | 대응 |
| --- | --- | --- |
| Profile 저장소가 보이지 않음 | 저장소 이름이 계정 ID와 불일치 | 대소문자까지 정확히 일치하는지 확인한다 |
| `docs` 폴더 생성 실패 | 현재 경로가 `portfolio-web`이 아님 | `pwd`로 위치를 확인하고 올바른 폴더로 이동한다 |
| Wiki 탭이 보이지 않음 | 기능 미지원 또는 권한 부족 | `notes/wiki-draft.md`로 대체한다 |
| push가 거절됨 | 원격에 없는 커밋이 있음 | `git pull origin main` 후 다시 push 한다 |

## 주의할 점

- 공개 프로필에 개인 정보를 과도하게 적지 않는다.
- Post-mortem에는 비밀 값, 토큰, 비밀번호를 적지 않는다.
- Profile 저장소와 `portfolio-web` 저장소를 섞지 않는다. README와 코드 변경은 `portfolio-web`에서만 커밋한다.
- 추가 심화는 [보충안 심화](supplement/01-advanced-practice.md), 복습 퀴즈는 [보충안 퀴즈](supplement/02-review-quiz.md), 에이전트 주도 Git은 [보충안 에이전트](supplement/03-agent-led-git.md)에서 다룬다.
