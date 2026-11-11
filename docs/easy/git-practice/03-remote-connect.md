---
stepHeader: true
subtitle: "GitHub 빈 저장소를 만들고 로컬 저장소에 연결해 올린다."
tags: ["remote", "origin", "push", "GitHub"]
---

# 원격 연결

{{ easyNotice }}

출처: [STEP 05 원격 저장소와 동기화](/git/05-remote)

커밋은 지금까지 내 컴퓨터(`.git`)에만 저장되어 있다. [GitHub란?](/git-easy/01-what-is-github)에서 본 공유와 백업을 위해 로컬 저장소를 GitHub 원격 저장소와 연결한다.

## 빈 원격 저장소 만들기

[가입과 저장소 만들기](/git-easy/github-practice/01-signup-and-repo)에서 만든 것은 웹 편집용 저장소다. 이번에는 내 컴퓨터의 파일을 올릴 **빈** 저장소를 따로 만든다. 이름이 같은 README가 있는 저장소에 올리면 첫 push가 거절될 수 있다.

1. GitHub에 로그인하고 오른쪽 위의 `+` 아이콘 → `New repository`를 고른다.
2. `Repository name`에 로컬 폴더와 같은 이름(예: `portfolio-web`)을 입력하고 `Public`을 고른다.
3. `Add a README file` 등 초기 파일 체크박스를 모두 해제한다. 이미 로컬에 커밋이 있으므로 빈 저장소여야 한다.
4. `Create repository`를 누르고 HTTPS 주소를 복사한다.

## 원격 주소 등록

```bash
git branch --show-current    # 브랜치가 main인지 확인. 아니면 git branch -m main
git remote add origin https://github.com/본인계정/portfolio-web.git
git remote -v                # 등록 확인
```

`origin`은 긴 URL에 붙이는 관례적 별칭이다.

## macOS 인증 준비 (gh CLI)

macOS는 push 인증을 위해 GitHub CLI(gh)를 미리 준비해 둔다.

1. [Homebrew](https://brew.sh)가 있다면 터미널에서 설치한다.

```bash
brew install gh
```

2. 설치를 확인하고 로그인한다.

```bash
gh --version
gh auth login
```

3. 질문에 `GitHub.com` → `HTTPS` → `Login with a web browser` 순서로 고른다. Git 자격 증명을 함께 설정할지 물으면 `Y`를 입력한다.
4. 터미널에 나온 일회용 코드를 브라우저에 입력해 승인하면 인증이 끝난다.
5. `gh auth status`로 로그인 상태를 확인한다.

Windows는 Git for Windows에 Git Credential Manager가 들어 있어, 인증이 필요할 때 브라우저 로그인 창이 뜨면 승인하면 된다. 자세한 준비는 [인증 준비](/git/05-remote)를 참고한다.

## 올리고 내려받기

```bash
git push -u origin main
```

- `-u` 옵션은 현재 `main` 브랜치가 원격 `origin/main`을 바라보게 하는 연결 고리다. 이후에는 `git push`, `git pull`만 입력해도 동기화된다.
- 인증 창이 뜨면 비밀번호가 아니라 브라우저 로그인으로 승인한다. Windows의 Git Credential Manager나 macOS의 GitHub CLI(`gh auth login`)가 이 과정을 도와준다. 자세한 준비는 [인증 준비](/git/05-remote)를 참고한다.
- GitHub 저장소 페이지를 새로고침해 파일과 커밋 이력이 올라갔는지 확인한다.

VS Code 소스 제어 창의 `변경 내용 동기화` 버튼도 같은 push/pull을 실행한다.

## push 거절 시

원격에 내 로컬에 없는 커밋이 있으면 push가 거절된다. `git pull origin main`으로 원격 변경을 먼저 내려받은 뒤 다시 push한다. 강제 push(`--force`)로 우회하지 않는다.
