---
subtitle: "macOS와 Windows의 사용 차이를 확인한다."
tags: ["macOS", "Windows", "경로", "자격 증명"]
---

# 운영체제별 차이

관련 STEP: [STEP 01 버전 관리의 세 영역](../01-environment.md) · [STEP 05 원격 저장소와 동기화](../05-remote.md)

같은 Git 명령이라도 터미널, 경로 표기, 인증 저장소가 OS마다 다르다. 수업 본문은 공통 흐름을 유지하고, 설치·경로·인증에서 막힐 때 이 부록을 확인한다. Windows는 Git Bash를, macOS는 기본 터미널(zsh)을 기준으로 한다.

## 왜 필요한가

초보자가 만나는 오류는 Git 개념보다 환경 차이에서 생기는 경우가 많다. Windows 경로를 macOS에 그대로 붙이거나, PowerShell에서 Git Bash용 경로를 실행하거나, 예전 GitHub 계정이 키체인에 남아 있으면 명령이 실패한다. OS에 맞는 경로와 인증 저장소를 알면 같은 Git 흐름을 그대로 유지할 수 있다.

## 핵심 개념

| 항목 | Windows | macOS |
| --- | --- | --- |
| 기본 터미널 | Git Bash | 터미널(zsh) |
| 경로 예 | `/c/Users/이름/Projects` | `/Users/이름/Projects` |
| 홈 디렉터리 | `C:\Users\이름`, Git Bash에서는 `~` | `/Users/이름`, `~` |
| 실행 가정 | PowerShell과 CMD에서 그대로 실행한다고 가정하지 않음 | zsh에서 실행 |
| 줄바꿈 | LF/CRLF가 섞일 수 있음 | LF 중심 |
| 자격 증명 | 자격 증명 관리자 → Windows 자격 증명 | 키체인 접근 → 로그인 → `github.com` |
| `code` 명령 | PATH에 등록된 경우에만 동작 | PATH에 등록된 경우에만 동작 |
| `gh` 설치 | 공식 설치 파일 | Homebrew 등 공식 안내 경로 |

- `cd /c/Users/이름/Projects` 같은 POSIX 경로는 Windows Git Bash 기준이다. macOS에서는 `/Users/이름/Projects`를 사용한다.
- 따옴표는 명령 전체를 감싸는 방식과 셸 차이를 확인한다. 공백이 있는 경로는 따옴표로 감싼다.
- 줄바꿈은 저장소 설정과 에디터 설정에 따라 LF/CRLF가 달라질 수 있다. `.gitattributes`나 에디터 설정을 임의로 바꾸지 않는다.
- VS Code의 `code` 명령은 PATH에 등록된 경우에만 터미널에서 동작한다. 등록되지 않으면 VS Code에서 폴더를 연다.
- Windows 인증 정보는 자격 증명 관리자에 저장될 수 있다. macOS는 키체인 접근의 `로그인` 항목에서 `github.com` 관련 비밀번호를 확인한다.
- 잘못된 계정으로 인증된 경우 해당 GitHub 항목만 삭제하고 재인증한다. 무관한 자격 증명을 일괄 삭제하지 않는다.
- `gh`는 Windows에서 공식 설치 파일, macOS에서 Homebrew 등 공식 안내 경로로 설치한다. 수업 직전 지원 버전을 확인한다.

## 따라하기

1. 자신의 OS를 먼저 확인한다.
2. Windows에서는 Git Bash, macOS에서는 터미널을 연다.
3. 경로와 홈 디렉터리를 OS에 맞게 바꾼다.
4. 인증 실패 시 해당 OS의 자격 증명 저장소에서 GitHub 항목만 확인한다.
5. 수업 도구의 설치 링크와 순서는 [설치 준비](00-installation.md)를 참조한다. 이 부록은 OS별 경로와 인증 차이를 확인할 때 사용한다.

## 체크리스트

- [ ] `pwd`가 내 교육용 폴더를 가리킨다.
- [ ] `git --version`이 정상 출력된다.
- [ ] 공백이 있는 경로도 따옴표로 감싸 실행할 수 있다.
- [ ] `git config --list`에서 `user.name`과 `user.email`을 확인했다.
- [ ] 인증 실패 시 GitHub 관련 항목만 확인했다.

## 주의

- 비밀번호와 토큰을 채팅·파일·Issue에 노출하지 않는다.
- OS별 메뉴와 항목명은 버전에 따라 다를 수 있다.
- 줄바꿈 설정을 임의로 바꾸면 diff가 파일 전체 변경처럼 보일 수 있다.
- Windows 자격 증명 삭제 절차는 [자격 증명 재인증](01-authentication.md) 부록을 참조한다.
- `gh`와 인증 창은 학습자가 직접 처리한다. 자동 전체 승인을 켜지 않는다.
