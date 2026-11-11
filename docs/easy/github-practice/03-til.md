---
stepHeader: true
subtitle: "라벨·이슈·마일스톤을 만들고 TIL·회고·부검을 작성한다."
tags: ["Issue", "Label", "Milestone", "TIL", "회고", "부검"]
---

# 라벨·이슈·기록 작성

할 일을 머릿속에만 두면 빼먹기 쉽다. Issue는 작업 요청과 버그를 적는 티켓이다. Label은 `bug`(오류), `enhancement`(새 기능 요청), `documentation`(문서)처럼 종류를 색으로 나누는 표식이다. Milestone은 목표 날짜나 버전으로 이슈를 묶고 진척을 보여 준다. 화면 이름은 버전에 따라 다를 수 있다.

## 라벨·이슈·마일스톤

실습 저장소의 `Issues` 탭에서 한다. 메뉴가 보이지 않으면 저장소 설정에서 Issues가 켜져 있는지 확인한다.

1. `Milestones`에서 `v1.0 첫 기록` 마일스톤을 만든다. 마감일은 실습이 끝나는 날로 잡는다.
2. `Labels`에서 기본 라벨을 확인한다. 없으면 `New label`로 이름·설명·색을 정해 `documentation`과 `enhancement`를 만든다. 쓰는 이슈가 있는 라벨은 지우기 전에 영향을 확인한다.
3. 이슈 2건을 등록하고 라벨과 마일스톤을 붙인다.
   - `[문서] README에 사용법 보완` — Label: `documentation`
   - `[기능] 프로필에 대표 작업 링크 추가` — Label: `enhancement`
4. Milestones 화면에서 아직 닫지 않은 이슈의 진척이 0에 가까운지 확인한다.
5. 이슈 본문에 관련 기록 파일 경로를 적는다. 기록 파일에도 이슈 주소를 적으면 서로 찾을 수 있다.

## TIL·회고·부검

기록의 종류와 작성 틀은 다르다. TIL은 배운 내용과 확인 결과, 회고는 경험과 다음 행동, 부검은 문제의 영향·원인·재발 방지다. 한 종류에 틀이 하나만 있는 것은 아니다.

Why→What→How는 이유, 내용, 방법 순으로 적는 작성 틀이다. [Golden Circle](https://simonsinek.com/golden-circle)의 질문 순서를 글에 맞게 바꾼 것이며, 페이지 제목으로 쓰지 않는다. STAR는 Situation(상황), Task(과제), Action(행동), Result(결과)로 경험을 설명하는 틀이다. 회고의 예시 틀인 KPT는 Keep(유지), Problem(문제), Try(다음 시도)다.

웹 편집기에서 저장소에 파일 3개를 만들고 커밋한다.

1. `docs/til.md`에 질문, 배운 점, 직접 확인한 결과, 아직 확인하지 못한 점을 적는다. Why→What→How로 이유·내용·적용 방법을 나눠도 된다.
2. `docs/retrospective.md`에 한 일과 느낌, Keep, Problem, Try를 적는다. Try는 언제 실행하고 어떻게 확인할지 적는다.
3. `docs/postmortem.md`에 확인한 사실과 추측을 나눈다. STAR로 적어도 되고, 원인을 모르면 미확인으로 남긴다. 재발 방지와 완료 확인 방법을 적는다.
4. 각 파일을 대응 이슈에 링크한다. Try와 후속 작업은 다음 이슈의 할 일로 옮긴다.

아래는 TIL을 짧게 적은 예다. 자신의 확인 결과로 바꾼다.

~~~markdown
# README가 프로필에 보이는 조건
- 질문: 왜 프로필 화면에 소개가 안 보일까?
- 배운 점: 사용자명과 같은 공개 저장소의 루트 README가 비어 있지 않아야 한다.
- 확인: 저장소를 만든 뒤 프로필을 새로고침하니 제목이 보였다.
- 다음 질문: 비공개 저장소로 만들면 어떻게 달라지는가?
~~~

## 추가자료

- [STEP 09 이슈와 마일스톤](/git/09-issues)
- [STEP 08 프로필과 작업 기록](/git/08-profile-records)
- [기록 작성 예시](/git/appendix/16-record-examples)
- [프로필과 기록 작성](/git/appendix/13-profile-records)
