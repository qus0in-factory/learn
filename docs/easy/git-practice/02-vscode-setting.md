---
stepHeader: true
subtitle: "VS Code 통합 터미널을 설정하고 새 저장소를 초기화한다."
tags: ["VS Code", "init", "저장소 초기화"]
installation: true
downloads: ["vscode"]
---

# VS Code 세팅

{{ easyNotice }}

출처: [STEP 01 따라하기](/git/01-environment), [STEP 02 따라하기](/git/02-local-repository)

VS Code에서 프로젝트 폴더를 열고 Git 저장소를 시작한다.

1. VS Code에서 `파일` → `폴더 열기`로 실습 전용 폴더(예: `portfolio-web`)를 연다.
2. 상단 메뉴에서 `터미널` → `새 터미널`을 연다. 기본 셸이 Git Bash(Windows) 또는 zsh(macOS)인지 확인한다.
3. 터미널에서 `git init`을 실행하여 저장소를 초기화한다.
4. 폴더 안에 `.git` 숨김 폴더가 생성되었는지 `ls -la`로 확인한다.
5. `git status`를 실행하여 초기화된 저장소 상태를 확인한다.
