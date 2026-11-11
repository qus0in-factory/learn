---
subtitle: "Git Bash와 VS Code에서 저장소를 만들고 커밋 준비를 한다."
---

# Git 실습

{{ easyNotice }}

출처: [STEP 01 따라하기](/git/01-environment), [STEP 02 따라하기](/git/02-local-repository), [부록 설치 준비](/git/appendix/00-installation)

## GitBash

Windows에서는 Git Bash를 사용한다. 설치 화면의 항목과 기본값은 [설치 준비](/git/appendix/00-installation)의 Windows Git 설치 절을 따른다.

1. VS Code를 실행한다.
2. 상단 메뉴에서 `터미널` → `새 터미널`을 클릭한다.
3. 터미널 종류를 확인한다. Windows 사용자는 Git Bash를 기본 셸로 선택하고, macOS 사용자는 기본 zsh 터미널을 사용한다.
4. `git --version`을 입력하고 `Enter`를 눌러 Git 설치 버전을 확인한다.
5. `pwd` 명령어로 현재 열려 있는 기본 폴더 위치를 확인한다.

## VSCode 세팅

- VS Code 통합 터미널 설정은 위 GitBash 절차를 따른다.
- 작업자 이름과 이메일은 GitHub 가입 이메일(또는 `noreply` 이메일)로 `--global` 설정한 뒤 `git config --global --list`로 확인한다. 자세한 명령은 [STEP 02](/git/02-local-repository)를 따른다.

## 소스 제어

- TODO: 기존 자료 없음 (VS Code 소스 제어 화면 사용법)

## 저장소 만들기와 파일 추적

1. 실습 전용 폴더(예: `portfolio-web`)를 생성하고 해당 디렉터리로 이동한다.
2. `git init`을 실행하여 저장소를 초기화한다.
3. `git status`를 실행하여 생성한 파일이 Untracked 상태로 표시되는지 확인한다.
4. `git add index.html`을 입력해 스테이징 영역에 파일을 올린다.
5. `git status`를 다시 실행하여 파일이 `Changes to be committed:` 목록으로 올라갔는지 확인한다.
