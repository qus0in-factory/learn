---
subtitle: "Git 설치 확인, 저장소 만들기, VS Code 소스 제어를 실습한다."
tags: ["Git Bash", "VS Code", "소스 제어", "init", "add", "commit", "push"]
---

# Git 실습

{{ easyNotice }}

출처: [STEP 01 따라하기](/git/01-environment), [STEP 02 따라하기](/git/02-local-repository), [STEP 03 커밋과 이력 기록](/git/03-commit-history), [STEP 05 따라하기](/git/05-remote), [부록 설치 준비](/git/appendix/00-installation)

[Git CLI란?](04-what-is-git-cli.md)과 [Git의 원리](05-git-principle.md)에서 배운 내용을 직접 해 보는 페이지다. 설치와 설정은 모두 여기에서 한다.

## Git 설치 확인

Windows에서는 Git을 설치할 때 함께 들어오는 Git Bash를 쓴다. 설치 화면의 항목과 기본값은 [설치 준비](/git/appendix/00-installation)의 Windows Git 설치 절을 따른다.

1. VS Code를 실행한다.
2. 상단 메뉴에서 `터미널` → `새 터미널`을 클릭한다.
3. 터미널 종류를 확인한다. Windows 사용자는 Git Bash를 기본 셸로 선택하고, macOS 사용자는 기본 zsh 터미널을 사용한다.
4. `git --version`을 입력하고 `Enter`를 눌러 Git 설치 버전을 확인한다.
5. `pwd` 명령어로 현재 열려 있는 기본 폴더 위치를 확인한다.

## 작업자 정보 설정

GitHub 가입 이메일(또는 `noreply` 이메일)로 작업자 이름과 이메일을 전역(`--global`)으로 설정하고, `git config --global --list`로 확인한다. 자세한 명령은 [STEP 02](/git/02-local-repository)를 따른다.

## 저장소 만들기와 파일 추적

1. 실습 전용 폴더(예: `portfolio-web`)를 생성하고 해당 디렉터리로 이동한다.
2. `git init`을 실행하여 저장소를 초기화한다.
3. `git status`를 실행하여 생성한 파일이 Untracked 상태로 표시되는지 확인한다.
4. `git add index.html`을 입력해 스테이징 영역에 파일을 올린다.
5. `git status`를 다시 실행하여 파일이 `Changes to be committed:` 목록으로 올라갔는지 확인한다.

## 원격 저장소 연결

[GitHub 실습](03-github-practice.md)에서 만든 빈 저장소를 연결한다.

1. `git branch --show-current`로 브랜치 이름을 확인한다. `main`이 아니면 `git branch -m main`으로 바꾼다.
2. `git remote add origin https://github.com/본인계정/portfolio-web.git`으로 원격 주소를 등록한다.
3. `git remote -v`로 등록을 확인한다.
4. `git push -u origin main`으로 로컬 커밋을 올린다. 인증 창이 뜨면 GitHub 로그인을 승인한다.
5. GitHub 저장소 페이지를 새로고침해 파일과 커밋 이력이 보이는지 확인한다.

## 소스 제어

출처: [STEP 03 커밋과 이력 기록](/git/03-commit-history), [STEP 05 원격 저장소와 동기화](/git/05-remote)의 `add`·`commit`·`push`를 화면으로 하는 방법이다. 화면은 VS Code 버전에 따라 다를 수 있다.

1. 왼쪽 활동 막대에서 소스 제어 아이콘을 눌러 변경된 파일 목록을 확인한다. 파일을 누르면 바뀐 부분을 비교해 볼 수 있다. (`git status`, `git diff`)
2. 커밋에 넣을 파일 옆의 `+` 버튼을 눌러 스테이징 영역에 올린다. (`git add`)
3. 위쪽 입력칸에 커밋 메시지를 쓴다. 예: `feat: 첫 웹페이지 추가`
4. `커밋` 버튼을 눌러 로컬 저장소에 기록한다. (`git commit -m`)
5. 원격 저장소가 연결되어 있으면 `변경 내용 동기화` 버튼으로 GitHub에 올린다. (`git push`)

버튼 이름이 다르게 보이면 터미널에서 같은 명령을 입력해도 된다.
