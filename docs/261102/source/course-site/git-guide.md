# 따라 하는 Git·Markdown·Branch 안내

명령은 Windows의 **Git Bash**에서 한 줄씩 실행합니다. 먼저 실습 폴더에서 Git Bash를 열고 `pwd`와 `git status`로 위치를 확인하세요. 암호·토큰은 명령이나 채팅에 입력하지 않습니다. 상세 화면과 버전은 수업 당일 공식 안내를 확인합니다.

## 1. 준비와 설치 (Windows)

1. [VS Code 공식 다운로드](https://code.visualstudio.com/download)에서 Windows 설치 파일을 내려받아 설치합니다.
2. [Git for Windows 공식 다운로드](https://git-scm.com/download/win)에서 설치 파일을 내려받아 설치합니다. 설치 옵션은 기본값으로 두고, 터미널은 Git Bash를 선택합니다. VS Code의 Source Control은 Git을 화면에서 다루는 기능이며 Git Bash 명령 실습을 대체하지 않습니다.
3. [GitHub](https://github.com/) 계정을 만들거나 로그인하고 이메일 확인을 마칩니다. 조직 계정은 저장소 생성이나 앱 사용이 제한될 수 있습니다.
4. 코딩 에이전트(OpenCode 등)는 강사 안내에 따라 설치합니다. 설치가 막혀도 준비된 예제와 웹 화면 시연으로 이어갑니다.
5. Git Bash를 열고 아래 사용자 이름과 이메일을 본인 것으로 바꿔 실행합니다. 이메일은 커밋 기록에 표시됩니다.

```bash
git --version
git config --global user.name "내 이름"
git config --global user.email "내 이메일 주소"
git config --global --list
```

VCS(Version Control System)는 변경 이력을 관리하는 체계이고 SCM(Source Control Management)은 소스 코드 관리라는 표현입니다. 이 수업에서는 로컬 파일 이력을 기록하는 Git과 원격 협업 서비스를 제공하는 GitHub를 구분합니다.

## 2. 첫 로컬 기록

Git 저장소 안에는 작업 폴더(Working Directory), 다음 기록에 담을 변경을 고르는 스테이징 영역(Index), 커밋 저장소(Repository)가 있습니다. `.git` 폴더에 이력이 들어갑니다. `.gitkeep`은 빈 폴더도 저장소에 보이도록 두는 빈 표식 파일이며 Git 자체의 특별 명령은 아닙니다. `.gitignore`에는 생성물·비밀 파일 등 추적하지 않을 경로를 적습니다. 이미 추적 중인 파일은 ignore에 추가해도 추적이 멈추지 않습니다.

실습 폴더로 이동한 뒤 `init`부터 순서대로 실행합니다. 파일 이름은 실제 프로젝트에 맞춰 고칩니다.

```bash
cd /c/Users/내이름/Projects/my-page
git init
git status
git add index.html style.css
git status
git commit -m "첫 웹페이지 추가"
git log --oneline
```

- `init`: 현재 폴더를 새 저장소로 만듭니다. 이미 저장소인 곳에서 반복할 필요가 없습니다.
- `status`: 현재 위치, 변경 파일, 스테이징 상태를 보여 줍니다. 다른 명령 전후에 확인합니다.
- `add`: 다음 커밋에 넣을 파일을 선택합니다. `git add .`는 폴더의 여러 변경을 한꺼번에 고르므로 초보 실습에서는 파일명을 지정합니다.
- `commit`: 선택한 변경을 로컬 기록으로 저장합니다. 메시지는 무엇을 바꿨는지 짧게 씁니다. `-m`을 생략하면 기본 편집기(환경에 따라 Vim/vi)가 열릴 수 있습니다. Vim에서는 `i`로 입력을 시작하고 메시지를 쓴 뒤 `Esc`, `:wq`, `Enter` 순서로 저장 후 종료합니다. 익숙하지 않으면 예제처럼 `-m`으로 메시지를 직접 적습니다.
- `log --oneline`: 커밋의 짧은 해시와 메시지를 한 줄씩 봅니다. 해시는 커밋을 구분하는 식별자입니다.

커밋 메시지는 명령형·짧은 문장으로 한 작업을 설명합니다(예: `소개 문구 추가`). 팀이 정한 Convention이 있으면 접두사 등 규칙을 따릅니다.

### 되돌리기 명령은 상태를 먼저 읽기

`reset`은 의미가 여러 가지이고 옵션에 따라 스테이징 또는 커밋 이력을 바꿉니다. **초보 실습에서 `git reset --hard`는 실행하지 않습니다.** 커밋되지 않은 수정이 삭제될 수 있습니다. 먼저 `git status`를 읽고, 이미 커밋했거나 공유한 기록이면 강사와 상의합니다.

```bash
git status
git diff
git diff --staged
```

`git reset <파일>`은 그 파일을 스테이징에서 내리지만 작업 파일 수정은 보존합니다. `git reset --soft HEAD~1`은 마지막 커밋을 취소해 변경을 스테이징에 남깁니다. `git reset --mixed HEAD~1`(기본)은 스테이징을 해제하고 파일 변경은 남깁니다. `--hard`는 작업 파일까지 버릴 수 있어 이 수업의 복사 명령에 포함하지 않습니다. 공유된 이력을 고치는 대신 새 커밋을 만드는 `revert`를 우선합니다.

`amend`는 가장 최근 커밋을 새 커밋으로 교체해 메시지나 내용을 고칩니다. 아직 다른 사람과 공유하지 않은 커밋에만 사용하세요. 이미 push한 커밋을 amend하면 원격 이력과 어긋날 수 있습니다. `revert`는 지정한 커밋의 변경을 되돌리는 새 커밋을 만듭니다.

```bash
git commit --amend -m "올바른 메시지"
git revert 커밋해시
```

## 3. 원격 저장소와 GitHub Pages

GitHub 웹에서 새 저장소를 만들 때 로컬에 이미 커밋이 있다면 README·라이선스·gitignore를 자동 생성하지 않도록 선택하면 첫 push가 단순합니다. GitHub의 원격 주소를 강사와 확인한 후 연결합니다. 아래 주소는 예시이므로 본인 주소로 바꿉니다.

```bash
git remote -v
git remote add origin https://github.com/계정이름/저장소이름.git
git branch -M main
git push -u origin main
```

`remote`는 원격 저장소 별칭과 주소를 관리하고, `push`는 로컬 커밋을 원격으로 보냅니다. `pull`은 원격 변경을 가져와 현재 작업에 통합합니다. `clone`은 원격 저장소 전체를 새 폴더로 복제합니다. `fork`는 GitHub에서 다른 사람 저장소의 내 쪽 복사본을 만드는 기능입니다. 인증 창이 뜨면 브라우저 안내를 따르고 비밀번호나 토큰을 공개하지 않습니다.

```bash
git pull origin main
git push
git clone https://github.com/계정이름/저장소이름.git
```

저장소의 **Settings → Pages**에서 배포 원본과 브랜치를 선택하고 저장합니다. 공개 범위와 계정 요금제 조건을 확인한 뒤 Actions/Pages 완료 상태와 제공된 주소를 엽니다. 배포에는 시간이 걸릴 수 있습니다. `push`는 소스를 GitHub에 올리는 동작이고 Pages는 정적 파일을 웹으로 제공하는 설정입니다.

## 4. Markdown으로 안내와 협업 기록 작성

Markdown은 일반 텍스트에 제목·목록·링크·코드 표시를 붙이는 `.md` 문법입니다. GitHub의 README는 저장소 소개, GitHub Profile README는 프로필 페이지에 보이는 소개를 담습니다. Issue는 할 일·문제 제안, Label은 Issue 분류, Milestone은 목표 묶음과 진행 상황, Wiki는 프로젝트의 여러 페이지 문서에 씁니다. TIL(Today I Learned)에는 오늘 배운 것과 막힌 점을 적고, 회고에는 다음에 바꿀 행동을 씁니다. 부검은 실패 원인과 재발 방지책을 사실 중심으로 살펴보는 학습 기록입니다.

````markdown
# 제목
## 작은 제목

바뀐 내용을 **굵게** 표시하고 [링크](https://example.com)를 답니다.

- 할 일 하나
- 할 일 둘

`코드 한 조각`

```bash
git status
```
````

실습에서는 README에 자기소개와 Pages 주소를 추가하고 미리보기/저장소 화면에서 읽히는지 확인합니다. Issue에 개선할 점 하나를 작성하고 Label·Milestone·Wiki가 어디에 쓰이는지 살펴봅니다. ChatGPT의 GitHub 연결/앱(초안의 GitHub Plugin)은 허용된 저장소 내용을 질의하는 선택 기능입니다. 제품 명칭과 제공 여부가 달라질 수 있고, 로컬 파일 수정·PR 생성 도구로 설명하지 않습니다. 개인 코드나 비밀 정보를 연결하지 않습니다.

GitHub CLI `gh`는 Git과 별도 설치하는 GitHub 서비스용 CLI입니다. Windows는 [공식 설치 안내](https://github.com/cli/cli#installation)에서 MSI를 내려받고, macOS는 Homebrew로 설치할 수 있습니다. 설치·인증을 수업 필수로 두지 않고 웹 화면을 대안으로 둡니다.

```bash
# macOS 강사 시연: Homebrew 설치 후
brew install gh
# Windows에서는 GitHub CLI 공식 MSI 설치 파일 사용
gh auth login
gh issue list
gh pr list
```

## 5. Branch와 Pull Request

브랜치는 커밋의 흐름을 가리키는 이름입니다. 기본 브랜치 이름은 저장소마다 `main` 또는 `master`일 수 있으므로 실제 이름을 확인합니다. `switch`는 브랜치를 이동하고 `checkout`은 이동과 과거 파일 복원 모두에 쓰이던 명령입니다. 초보 실습은 목적이 분명한 `switch`를 사용합니다. 새 작업은 `switch -c`로 만듭니다. Tag는 특정 커밋에 붙이는 버전 표식입니다.

```bash
git branch
# checkout은 기존 방식의 브랜치 이동 명령
git checkout main
# 이후에는 목적을 분명히 하는 switch 사용
git switch -c update-intro
# 파일 수정 후 상태 확인, 선택한 파일 add와 commit
git status
git add index.html
git commit -m "소개 페이지 수정"
git log --oneline --graph --decorate
git switch main  # 기본 브랜치가 master라면 main 대신 master
git merge update-intro
git tag v1.0.0
```

Fast-forward merge는 대상 브랜치가 갈라진 뒤 추가 커밋이 없어 포인터만 앞으로 움직이는 병합입니다. 두 브랜치가 각각 커밋을 만든 경우 보통 3-way merge로 공통 조상과 양쪽 변경을 합칩니다. 같은 줄을 다르게 고치면 conflict가 나며, 충돌 표시를 읽고 합칠 내용을 편집한 뒤 상태 확인·add·commit으로 해결합니다. 작업을 잃지 않도록 충돌 파일을 저장하기 전에 강사와 확인합니다.

Pull Request(PR)는 브랜치 변경을 기본 브랜치에 반영해 달라고 제안하고 검토·대화하는 GitHub 절차입니다. 웹에서 만들고 비교할 수 있으며, `gh pr create`는 선택 시연입니다. 수업 시간이 밀리면 PR 작성은 강사 시연으로 바꾸고 로컬 기록·원격 공유·Pages 확인을 우선합니다.

## 복습 명령 순서

```bash
git status
git add 파일이름
git status
git commit -m "무엇을 바꿨는지"
git log --oneline
git push
```
