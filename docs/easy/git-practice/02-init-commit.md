---
stepHeader: true
subtitle: "폴더를 저장소로 초기화하고 첫 커밋을 기록한다."
tags: ["init", "add", "commit", "status"]
installation: true
downloads: ["vscode"]
---

# 초기화와 커밋

새 폴더는 Git에게 버전 관리를 명령하기 전까지는 그냥 폴더다. [Git의 원리](/git-easy/05-git-principle)에서 본 세 영역이 이 절차 안에서 움직이기 시작한다.

1. VS Code에서 `파일` → `폴더 열기`로 실습 전용 폴더(예: `portfolio-web`)를 연다.
2. `터미널` → `새 터미널`을 열어 기본 셸이 Git Bash(Windows) 또는 zsh(macOS)인지 확인한다.

## 작업자 정보 등록

커밋에는 누가 만들었는지 기록된다. GitHub 가입 이메일(또는 `noreply` 이메일)로 이름과 이메일을 전역(`--global`)으로 등록한다.

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
git config --global --list
```

이메일을 GitHub 계정과 맞추면 커밋이 내 계정에 연결된다. 오타가 있으면 같은 명령을 다시 실행해 덮어쓴다.

등록한 값은 개별 키로도 확인한다.

```bash
git config user.name
git config user.email
```

## 저장소 초기화

```bash
git init
ls -la    # .git 숨김 폴더 확인
```

`init`은 initialization(초기화)의 줄임말이다. 실행하면 숨김 폴더 `.git`이 만들어지고 이력이 그 안에 저장된다. `.git` 폴더 안은 사용자가 직접 고치지 않는다.

## 파일을 스테이징하고 커밋

VS Code의 소스 제어 화면으로도 처리할 수 있지만, 여기서는 터미널 명령으로 진행한다.

1. `index.html`을 만들고 저장한다.
2. `git status`를 실행한다. 새 파일은 빨간색 Untracked로 표시된다.
3. `git add index.html`로 스테이징 영역에 올린다.
4. `git status`를 다시 실행해 `Changes to be committed:` 목록(초록색)으로 옮겨졌는지 확인한다.
5. 커밋으로 영구 기록한다.

```bash
git add index.html
git commit -m "feat: 첫 웹페이지 추가"
git log --oneline    # 커밋 이력 확인
```

명령의 의미를 알면 외우기 쉽다. `status`는 상태, `add`는 스테이징 영역에 더한다(add), `commit`은 확정한다는 뜻이다.

## 스테이징 실수 되돌리기

- 이미 커밋된 적 있는 파일: `git restore --staged <파일>`로 스테이징만 취소한다.
- 첫 커밋 전 새 파일: `git rm --cached -- <파일>`로 인덱스에서만 빼 Untracked로 되돌린다.

`git add .`로 한 번에 올리면 민감한 파일이나 임시 파일도 같이 올라갈 수 있다. 입문 단계에서는 파일명을 지정해 올리는 습관을 들인다.

## 추가자료

- [STEP 02 따라하기](/git/02-local-repository)
- [STEP 03 커밋과 이력 기록](/git/03-commit-history)
