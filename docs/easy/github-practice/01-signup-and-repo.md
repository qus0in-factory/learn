---
subtitle: "GitHub에 가입하고 프로젝트를 담을 새 저장소를 만든다."
tags: ["GitHub 가입", "저장소 만들기", "계정 설정"]
---

# 가입과 저장소 만들기

{{ easyNotice }}

출처: [STEP 02 GitHub 가입](/git/02-local-repository), [STEP 05 따라하기](/git/05-remote)

[GitHub란?](/git-easy/01-what-is-github)에서 배운 내용을 직접 실습한다. 원격 저장소를 쓰려면 GitHub 계정이 필요하다.

## GitHub 가입

Git 명령은 내 컴퓨터에서 실행되지만, 원격 저장소와 배포에는 GitHub 계정이 필요하다.

1. [github.com/signup](https://github.com/signup)에서 이메일, 비밀번호, 사용자 이름을 입력해 가입한다.
2. 사용자 이름은 저장소 주소(`github.com/사용자이름/…`)에 그대로 쓰이므로 알아보기 쉬운 영문 이름으로 정한다.
3. 가입 이메일로 온 인증 메일을 열어 이메일 인증을 마친다. 메일이 보이지 않으면 [이메일 주소 인증 안내](https://docs.github.com/ko/account-and-profile/how-tos/email-preferences/verifying-your-email-address)를 참고한다.
4. 이메일을 공개하고 싶지 않으면 GitHub 설정의 [Emails](https://github.com/settings/emails)에서 `Keep my email addresses private`를 켜고, 표시되는 `noreply` 이메일을 확인해 둔다. 자세한 절차는 [커밋 이메일 주소 설정 안내](https://docs.github.com/ko/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address)를 참고한다.

## 원격 저장소 만들기

1. 브라우저에서 GitHub에 로그인한다.
2. 오른쪽 위의 `+` 아이콘을 누르고 `New repository`를 선택한다.
3. `Repository name`에 저장소 이름을 입력하고(예: `portfolio-web`) 공개 범위는 `Public`을 고른다.
4. 내 컴퓨터에 이미 파일이 있으면 `Add a README file`, `Add .gitignore`, `Choose a license`를 모두 해제하고 빈 저장소로 만든다.
5. `Create repository` 버튼을 누른다.

내 컴퓨터의 저장소를 이 원격 저장소에 연결하고 `push`하는 명령은 [원격과 동기화](/git-easy/git-practice/04-remote-sync)에서 한다.
