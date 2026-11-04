---
subtitle: "실습에 필요한 도구를 운영체제에 맞게 설치한다."
tags: ["VS Code", "OpenCode", "Git"]
downloads: ["vscode", "gitWindows", "opencode", "gh"]
---

# 설치 준비

설치 후 [STEP 01](../01-environment.md)에서 터미널을 열고 Git 버전과 OpenCode 응답을 확인한다. GitHub CLI(gh)를 설치했다면 `gh --version`으로 확인하고, 로그인은 [STEP 05 인증 준비](../05-remote.md)를 참고한다. 경로와 인증 차이는 [운영체제별 차이](05-os-differences.md)를 참고한다.
설치가 끝나면 터미널에서 `git --version`을 실행해 `git version`과 버전 숫자가 출력되는지 확인한다. 숫자와 괄호 안 표기는 설치한 환경에 따라 다르다.

<Screenshot name="appendix00-git-version" alt="`$ git --version` 다음에 `git version 2.50.1 (Apple Git-155)`가 보인다. 앞 글자에 다른 기호는 없다." />


## Windows Git 설치

Git for Windows 설치 화면의 항목과 기본값은 버전에 따라 달라질 수 있으므로 현재 화면을 확인한다.

- PATH 설정에 따라 Git Bash 밖의 터미널과 다른 프로그램에서도 Git을 찾을 수 있다.
- 기본 편집기는 커밋 메시지 등을 편집할 때 열리는 프로그램이다.
- 줄바꿈은 체크아웃과 커밋 시 LF·CRLF 변환 방식에 영향을 준다. 프로젝트의 규칙을 확인한다.
- 초기 브랜치 이름은 새 저장소를 만들 때 사용할 이름을 정한다.
- 터미널은 Git Bash를 표시할 창의 종류와 사용 방식을 정한다.
- 자격 증명 관리자는 HTTPS 인증 정보를 저장하고 다시 쓰는 데 관여한다.

설정은 설치 후에도 바꿀 수 있다. [Git 설정 안내](https://git-scm.com/book/ko/v2/시작하기-Git-최초-설정)와 [Git for Windows](https://gitforwindows.org/)를 참고한다.
