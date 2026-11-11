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

출처: [STEP 03 커밋과 이력 기록](/git/03-commit-history), [STEP 05 원격 저장소와 동기화](/git/05-remote)의 `add`·`commit`·`push`를 화면으로 하는 방법이다. 화면은 VS Code 버전에 따라 다를 수 있다.

1. 왼쪽 활동 막대에서 소스 제어 아이콘을 눌러 변경된 파일 목록을 확인한다. 파일을 누르면 바뀐 부분을 비교해 볼 수 있다. (`git status`, `git diff`)
2. 커밋에 넣을 파일 옆의 `+` 버튼을 눌러 스테이징 영역에 올린다. (`git add`)
3. 위쪽 입력칸에 커밋 메시지를 쓴다. 예: `feat: 첫 웹페이지 추가`
4. `커밋` 버튼을 눌러 로컬 저장소에 기록한다. (`git commit -m`)
5. 원격 저장소가 연결되어 있으면 `변경 내용 동기화` 버튼으로 GitHub에 올린다. (`git push`)

버튼 이름이 다르게 보이면 터미널에서 같은 명령을 입력해도 된다.

## 저장소 만들기와 파일 추적

1. 실습 전용 폴더(예: `portfolio-web`)를 생성하고 해당 디렉터리로 이동한다.
2. `git init`을 실행하여 저장소를 초기화한다.
3. `git status`를 실행하여 생성한 파일이 Untracked 상태로 표시되는지 확인한다.
4. `git add index.html`을 입력해 스테이징 영역에 파일을 올린다.
5. `git status`를 다시 실행하여 파일이 `Changes to be committed:` 목록으로 올라갔는지 확인한다.
