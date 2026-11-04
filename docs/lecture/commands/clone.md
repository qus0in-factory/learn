---
command: clone
subtitle: "원격 저장소의 이력과 파일을 새 폴더로 통째로 복제한다."
stepRefs: ["05-remote", "appendix/02-git-options"]
---

# git clone

## 용도

GitHub 원격 저장소의 모든 커밋 이력과 파일을 로컬의 새 폴더로 내려받는다. 다른 컴퓨터에서 작업을 이어 가거나 백업을 확인할 때 쓰며, `init`·`remote add`를 따로 하지 않아도 `origin`이 자동으로 등록된다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| `주소` | 저장소 이름과 같은 폴더를 만들어 복제 | 현재 폴더 아래에 생성 |
| `주소 폴더명` | 지정한 이름의 폴더로 복제 | 같은 이름 폴더가 이미 있을 때 |

## 예시

```bash
git clone https://github.com/본인계정/portfolio-web.git portfolio-web-backup
cd portfolio-web-backup
git log --oneline
git remote -v
```

복제한 폴더에서 `git log --oneline`에 원격과 같은 커밋이 보이고, `git remote -v`에 `origin`이 이미 등록돼 있다.

## 주의할 점

- 이미 저장소인 폴더 안에서 실행하지 않는다. 저장소가 겹친다.
- 수업 저장소를 작업 중인 폴더 옆에 복제할 때는 폴더명을 다르게 지정한다.
- 복제는 그 시점의 사본이다. 이후 원격 변경은 `git pull`로 받는다.

<CommandLinks />
