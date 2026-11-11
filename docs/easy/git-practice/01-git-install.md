---
stepHeader: true
subtitle: "Git을 설치하고 터미널 환경을 설정한다."
tags: ["Git 설치", "버전 확인", "터미널"]
installation: true
downloads: ["gitWindows"]
---

# Git 설치

[Git이란?](/git-easy/04-what-is-git-cli)에서 본 버전 관리 도구를 내 컴퓨터에 설치한다. Windows는 Git Bash가 함께 설치되는 Git for Windows를 쓰고, macOS는 `git --version` 입력 시 나오는 안내나 [Homebrew](https://brew.sh)로 설치한다.

## 설치

1. Windows는 [gitforwindows.org](https://gitforwindows.org/)에서 설치 파일을 내려받아 실행한다. 설치 화면의 항목과 기본값은 [설치 준비](/git/appendix/00-installation)의 Windows Git 설치 절을 따른다.
2. macOS는 터미널에 `git --version`을 입력한다. 설치 안내 창이 뜨면 안내대로 설치한다.
3. 설치 후 터미널을 새로 열어 확인한다.

## 설치 확인

VS Code의 터미널에서 아래 명령으로 확인한다. VS Code에서 `터미널` → `새 터미널` 메뉴로 터미널을 연다. Windows 사용자는 Git Bash를 기본 셸로 고르고, macOS 사용자는 기본 zsh 터미널을 쓴다.

```bash
git --version
```

`git version 2.x.x` 형태로 버전이 출력되면 설치가 끝난 것이다. 숫자와 괄호 안 표기는 설치한 Git에 따라 다를 수 있다.

`git: command not found`가 나오면 Git이 설치되지 않았거나 PATH에 등록되지 않은 것이다. [설치 준비](/git/appendix/00-installation)를 다시 확인한다.

## VS Code 터미널 세팅

Git 명령은 VS Code 안의 통합 터미널에서 실행한다. 터미널이 어떤 셸로 열리는지 미리 정해 둔다.

1. VS Code에서 `터미널` → `새 터미널`을 연다.
2. 터미널 오른쪽 위의 `∨`(드롭다운) → `기본 프로필 선택`을 누른다.
3. Windows는 `Git Bash`를, macOS는 `zsh`를 고른다.
4. 터미널을 새로 열어 프롬프트 앞의 경로가 보이는지 확인한다.
5. `pwd`로 현재 폴더 위치를 확인한다. Git Bash에서는 `/c/Users/…`처럼 보이는 것이 정상이다.

이후 예시는 모두 이 통합 터미널에서 실행한다.

## 추가자료

- [STEP 01 따라하기](/git/01-environment)
- [부록 설치 준비](/git/appendix/00-installation)
