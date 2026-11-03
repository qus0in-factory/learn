---
subtitle: "Windows 자격 증명을 초기화하고 GitHub에 재인증한다."
---

# Windows 자격 증명·GitHub 재인증

관련 차시: [5차시 GitHub 원격 연동](../05-remote.md)

Git은 커밋 작성자 정보와 GitHub 로그인 정보를 따로 관리합니다. 이 부록은 Windows에서 잘못된 계정으로 인증됐을 때 저장된 GitHub 자격 증명만 찾아 삭제하고 다시 인증하는 절차를 다룹니다. macOS의 키체인은 [부록 5](05-os-differences.md)를 참조합니다.

## 왜 필요한가

`git config user.name`과 `user.email`은 커밋에 표시되는 작성자 이름과 이메일입니다. GitHub 로그인 계정과 같을 필요가 없습니다. 반면 `git push`와 `git pull`은 Git Credential Manager가 가져온 OS 자격 증명을 사용합니다. 브라우저에서 다른 계정으로 로그인했거나 예전 계정의 자격 증명이 남아 있으면 push가 403으로 거절되거나 권한 없는 저장소에 접근하려는 오류가 납니다. 이때 모든 자격 증명을 지우지 않고 GitHub 관련 항목만 삭제한 뒤 다시 인증합니다.

## 핵심 개념

- Git Credential Manager는 Git 명령을 실행할 때 브라우저 또는 OS 저장소에서 인증 정보를 가져옵니다.
- 브라우저 GitHub 로그인은 웹 세션용이고, OS 자격 증명은 Git push/pull에 사용될 수 있습니다.
- Windows는 제어판 → 사용자 계정 → 자격 증명 관리자 → Windows 자격 증명에서 GitHub 관련 항목을 확인합니다.
- PC와 Windows 버전에 따라 메뉴 이름과 항목 위치가 다를 수 있습니다.
- 삭제 대상은 `git:https://github.com`처럼 Git이 GitHub에 접속할 때 쓰는 항목으로 한정합니다.

## 따라하기

1. `git remote -v`로 대상 저장소 주소가 맞는지 확인합니다.
2. push/pull 시 인증 창이 뜨면 본인이 직접 GitHub 계정으로 로그인합니다.
3. 다른 계정으로 잘못 인증된 경우 Windows 자격 증명 관리자를 엽니다.
4. `git:https://github.com` 또는 GitHub 관련 항목만 찾습니다.
5. 해당 항목을 삭제한 뒤 다시 push/pull하여 재인증합니다.
6. 재인증 후 `git config --local user.name`, `git config --local user.email`을 확인합니다.
7. 실제 인증은 `git ls-remote origin` 또는 push 성공, GitHub Settings의 세션 목록, 필요 시 `gh auth status`로 확인합니다.
8. 조직 SSO나 2FA가 걸린 계정은 브라우저 승인과 자격 증명 재등록을 함께 확인합니다.

## 확인법

- [ ] `git remote -v`의 주소가 내 교육용 저장소다.
- [ ] 자격 증명 관리자에서 GitHub 관련 항목만 삭제했다.
- [ ] `git ls-remote origin`이 오류 없이 원격 참조를 보여 준다.
- [ ] push 후 GitHub 웹에서 커밋이 보인다.
- [ ] `git config --local user.name`과 `user.email`이 내 커밋 작성자다.

## 문제 대응

| 증상 | 원인 | 대응 |
| --- | --- | --- |
| push가 403으로 거절됨 | 다른 계정의 자격 증명이 남아 있음 | GitHub 관련 항목만 삭제 후 재인증 |
| 인증 창이 다시 뜨지 않음 | 저장된 자격 증명을 재사용 | 자격 증명 관리자에서 항목 확인 |
| 조직 저장소에서 권한 오류 | SSO 승인 또는 2FA 필요 | 브라우저에서 조직 SSO 승인 후 재인증 |
| 커밋 작성자가 다르게 보임 | `git config`가 다른 값 | `git config --local user.name`·`user.email` 확인 |

## 주의

- 무관한 자격 증명을 일괄 삭제하지 않습니다.
- 토큰이나 비밀번호를 채팅·파일·Issue에 노출하지 않습니다.
- 삭제 전 항목 이름과 주소를 확인합니다.
- 인증 창은 학습자가 직접 처리합니다. 강사가 비밀번호를 대신 입력하지 않습니다.
