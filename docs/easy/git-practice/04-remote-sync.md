---
subtitle: "로컬 커밋을 원격 저장소에 등록하고 동기화한다."
tags: ["원격 동기화", "remote", "push", "GitHub"]
---

# 원격과 동기화

{{ easyNotice }}

출처: [STEP 05 원격 저장소와 동기화](/git/05-remote)

[가입과 저장소 만들기](/git-easy/github-practice/01-signup-and-repo)에서 만든 빈 원격 저장소와 로컬 저장소를 연결하고 코드를 올린다.

1. `git branch --show-current`로 브랜치 이름을 확인한다. `main`이 아니면 `git branch -m main`으로 바꾼다.
2. `git remote add origin https://github.com/본인계정/portfolio-web.git`으로 원격 주소를 등록한다.
3. `git remote -v`로 등록을 확인한다.
4. `git push -u origin main`으로 로컬 커밋을 올린다. 브라우저 인증 창이 뜨면 로그인을 승인한다.
5. VS Code 소스 제어 창에서 하단의 `변경 내용 동기화` 버튼을 눌러도 동일하게 원격과 push/pull이 진행된다.
6. GitHub 저장소 페이지를 새로고침해 파일과 커밋 이력이 잘 올라갔는지 확인한다.
