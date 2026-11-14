---
stepHeader: true
subtitle: "마크다운으로 README 문서를 작성한다."
tags: ["마크다운", "README", "프로필"]
---

# 마크다운 작성

프로젝트 설명과 나를 소개하는 글은 둘 다 README지만 저장소가 다르다. 작업 저장소 README는 그 프로젝트의 목적과 사용법을 보여 준다. Profile 저장소는 사용자명과 이름이 같은 공개 저장소(`https://github.com/<사용자명>/<사용자명>`)이고, 루트 README가 비어 있지 않으면 `https://github.com/<사용자명>` 프로필에 보인다. `<사용자명>.github.io`는 Pages로 사이트를 올리는 저장소라서 프로필 README와 다르다.

문법의 자세한 표는 [GitHub의 기본 작성 및 서식 문법](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)을 참고한다. 배지 예시는 [Shields.io](https://shields.io/)와 [Markdown Badges](https://github.com/Ileriayo/markdown-badges)에서 필요한 것만 고른다. 다른 사람 프로필은 [Awesome GitHub Profile README](https://github.com/abhisheknaiidu/awesome-github-profile-readme)에서 보고, 통째로 복사하지 않는다.

## 웹 편집기로 README 수정

1. [가입과 저장소 만들기](01-signup-and-repo.md)의 저장소를 열고 `.` 키로 웹 편집기를 연다. 화면은 버전에 따라 다를 수 있다.
2. `README.md`에 제목, 한 줄 소개, 사용 방법, 기술 또는 배운 점을 적는다.
3. 아래 문법이 미리보기나 저장소 화면에서 서식으로 보이는지 확인한다.

~~~markdown
# 제목
**굵게**와 *기울임*

- 순서 없는 목록
1. 순서 있는 목록

[링크 이름](https://example.com)
![이미지 설명](image.png)
`인라인 코드`

| 항목 | 설명 |
| --- | --- |
| 문서 | README |

- [ ] 할 일
~~~

4. 고친 내용을 커밋한다. 커밋 메시지 예: `docs: README에 소개와 사용법 추가`. 제목 끝에 마침표를 찍지 않는다.
5. 저장소 첫 화면을 새로고침해 README가 렌더링되는지 확인한다.

## 프로필 README

1. GitHub에서 본인 사용자명과 정확히 같은 이름의 공개 저장소를 만든다. 예: 사용자명이 `octocat`이면 `octocat/octocat`.
2. `Add a README file`을 켜고 저장소를 만든다.
3. 웹 편집기에서 루트 `README.md`에 소개 문구와 관심 기술만 짧게 적고 커밋한다.
4. `https://github.com/<사용자명>`을 새로고침해 README가 프로필에 보이는지 확인한다.

보이지 않으면 저장소 이름, 공개 여부, 비어 있지 않은 루트 README를 확인한다. 2020년 7월 전에 만든 저장소는 설정에서 프로필 표시를 켜야 할 수 있다. 비밀 값과 개인 연락처를 함부로 적지 않는다.

## 추가자료

- [STEP 07 마크다운과 다이어그램](/git/07-markdown-mermaid)
- [STEP 08 프로필과 작업 기록](/git/08-profile-records)
- [프로필과 기록 작성](/git/appendix/13-profile-records)
