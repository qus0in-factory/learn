---
subtitle: "GitHub에 가입하고 README가 있는 저장소를 만든 뒤 웹 편집기를 연다."
tags: ["GitHub 가입", "저장소 만들기", "README", "github.dev"]
---

# 가입과 저장소 만들기

{{ easyNotice }}

출처: [STEP 02 GitHub 가입](/git/02-local-repository), [STEP 05 따라하기](/git/05-remote), [GitHub 웹 편집기 안내](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor)

[GitHub란?](/git-easy/01-what-is-github)에서 본 공유와 기록을 직접 시작한다. 이 페이지의 저장소는 웹에서 문서를 고치기 위한 것이다. 나중에 내 컴퓨터의 파일을 올릴 빈 저장소는 [원격과 동기화](/git-easy/git-practice/04-remote-sync)에서 따로 만든다. 이름이 같으면 원격에 먼저 생긴 README 커밋 때문에 첫 push가 거절될 수 있다.

## GitHub 가입

Git 명령은 내 컴퓨터에서 실행되지만, 원격 저장소와 배포에는 GitHub 계정이 필요하다.

1. [github.com/signup](https://github.com/signup)에서 이메일, 비밀번호, 사용자 이름을 입력해 가입한다.
2. 사용자 이름은 저장소 주소(`github.com/사용자이름/…`)에 그대로 쓰이므로 알아보기 쉬운 영문 이름으로 정한다.
3. 가입 이메일로 온 인증 메일을 열어 이메일 인증을 마친다. 메일이 보이지 않으면 [이메일 주소 인증 안내](https://docs.github.com/ko/account-and-profile/how-tos/email-preferences/verifying-your-email-address)를 참고한다.
4. 이메일을 공개하고 싶지 않으면 GitHub 설정의 [Emails](https://github.com/settings/emails)에서 `Keep my email addresses private`를 켜고, 표시되는 `noreply` 이메일을 확인해 둔다. 자세한 절차는 [커밋 이메일 주소 설정 안내](https://docs.github.com/ko/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address)를 참고한다.

## README가 있는 저장소

README는 저장소 첫 화면에 자동으로 보이는 설명서다. 목적, 사용 방법, 주의할 점을 짧게 적는다.

1. 브라우저에서 GitHub에 로그인한다.
2. 오른쪽 위의 `+` 아이콘을 누르고 `New repository`를 선택한다.
3. `Repository name`에 실습용 이름을 입력한다. 예: `hello-github`. 로컬 실습용 `portfolio-web`와 겹치지 않게 한다.
4. 공개 범위는 `Public`을 고른다.
5. `Add a README file`을 켠다. 이 페이지는 웹에서 바로 고칠 파일이 필요하므로, 로컬 파일을 올릴 때와 달리 README를 포함해 만든다.
6. `Create repository`를 누른다.
7. 저장소 첫 화면에서 `README.md`가 보이는지 확인한다. 보이지 않으면 이름, 공개 범위, README 포함 여부를 다시 본다.

## 웹 편집기 열기

저장소 페이지에서 `.`(마침표) 키를 누르면 브라우저 안의 편집기 [github.dev](https://github.dev)가 열린다. 주소의 `github.com`을 `github.dev`로 바꿔도 같은 편집기로 들어갈 수 있다. 화면과 단축키는 버전에 따라 다를 수 있다. 정확한 설명은 [웹 기반 편집기 안내](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor)를 참고한다.

1. 방금 만든 저장소 페이지를 연다.
2. `.` 키를 눌러 웹 편집기가 열리는지 확인한다.
3. 왼쪽 파일 목록에서 `README.md`를 연다. 내용은 다음 페이지에서 고친다.
4. 편집기를 닫아도 저장소의 커밋은 그대로 남는다. 고친 글을 남기려면 편집기에서 커밋해야 한다.

비밀번호, 토큰, 비밀 키는 README와 커밋 메시지에 적지 않는다.
