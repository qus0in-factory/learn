---
stepHeader: true
subtitle: "Git Bash를 설치하고 터미널과 작업자 정보를 설정한다."
tags: ["Git Bash", "설치", "config", "환경설정"]
installation: true
downloads: ["gitWindows"]
---

# Git Bash 설치와 설정

{{ easyNotice }}

출처: [STEP 01 따라하기](/git/01-environment), [STEP 02 따라하기](/git/02-local-repository), [부록 설치 준비](/git/appendix/00-installation)

Windows에서는 Git을 설치할 때 함께 들어오는 Git Bash를 쓴다. 설치 화면의 항목과 기본값은 [설치 준비](/git/appendix/00-installation)의 Windows Git 설치 절을 따른다.

1. VS Code를 실행한다.
2. 상단 메뉴에서 `터미널` → `새 터미널`을 클릭한다.
3. 터미널 종류를 확인한다. Windows 사용자는 Git Bash를 기본 셸로 선택하고, macOS 사용자는 기본 zsh 터미널을 사용한다.
4. `git --version`을 입력하고 `Enter`를 눌러 Git 설치 버전을 확인한다.
5. `pwd` 명령어로 현재 열려 있는 기본 폴더 위치를 확인한다.

## 작업자 정보 설정

GitHub 가입 이메일(또는 `noreply` 이메일)로 작업자 이름과 이메일을 전역(`--global`)으로 설정하고, `git config --global --list`로 확인한다. 자세한 명령은 [STEP 02](/git/02-local-repository)를 따른다.
