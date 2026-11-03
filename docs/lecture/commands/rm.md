---
command: rm
subtitle: "이미 추적 중인 파일의 추적을 끊어 .gitignore가 작동하게 한다."
stepRefs: ["04-amend-ignore", "appendix/02-git-options"]
---

# git rm

## 용도

Git이 추적하는 파일을 추적 목록에서 제거한다. `--cached`를 붙이면 작업 공간의 파일은 지우지 않고 추적만 끊으므로, `.gitignore`에 적었는데도 계속 잡히는 파일(`.env`, 운영체제 임시 파일 등)을 제외할 때 쓴다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| `--cached 파일명` | 추적만 해제, 파일은 폴더에 남김 | 수업에서 쓰는 형태 |
| `파일명` (옵션 없음) | 추적 해제와 함께 파일 삭제 | 파일이 폴더에서도 사라진다 |

## 예시

```bash
echo ".env" >> .gitignore
git rm --cached .env
git status
git commit -m "chore: 비밀 설정 파일 추적 해제"
```

`.env`가 `deleted:`로 스테이징되고 커밋하면 이후 추적되지 않는다. 폴더의 `.env` 파일은 그대로 남는다.

## 주의할 점

- `.gitignore`는 아직 추적하지 않은 파일에만 작동한다. 이미 커밋된 파일은 `git rm --cached` 뒤 커밋해야 제외된다.
- 비밀정보가 이미 push됐다면 추적 해제만으로는 이력에서 사라지지 않는다. 토큰·비밀번호를 바꾸고 강사에게 알린다.
- `--cached`를 빠뜨리면 파일이 삭제된다. 실행 전 옵션을 다시 확인한다.

<CommandLinks />
