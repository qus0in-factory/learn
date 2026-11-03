---
command: config
subtitle: "커밋에 기록될 작성자 이름과 이메일 등 Git 설정을 등록하고 확인한다."
stepRefs: ["02-local-repository", "appendix/02-git-options"]
---

# git config

## 용도

Git이 커밋에 기록할 작성자 이름과 이메일, 기본 동작을 설정한다. 설정은 사용자 전체(`--global`)와 저장소 하나(`--local`) 두 범위에 저장되며, 같은 키가 둘 다 있으면 저장소 설정이 우선한다. 수업에서는 처음 한 번 전역으로 작성자 정보를 등록한다.

## 자주 쓰는 옵션

| 옵션 | 의미 | 기본 동작 |
| --- | --- | --- |
| `--global` | 이 컴퓨터의 내 계정 전체에 적용 | 생략하면 현재 저장소에만 저장 |
| `--local` | 현재 저장소에만 적용 | 생략 시 기본값 |
| `--list` | 저장된 설정을 모두 출력 | 범위 옵션과 함께 쓰면 그 범위만 출력 |
| `user.name "이름"` | 커밋 작성자 이름 | 값이 없으면 커밋 시 등록을 요구 |
| `user.email "이메일"` | 커밋 작성자 이메일 | GitHub 가입 이메일 또는 noreply 이메일 |

## 예시

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
git config --global --list
git config user.name
```

첫 두 줄은 작성자 정보를 전역으로 등록한다. 세 번째 줄은 전역 설정 전체를, 마지막 줄은 현재 적용되는 이름 하나를 보여 준다.

## 주의할 점

- 이름이나 이메일에 오타를 넣었다면 같은 명령을 다시 실행해 값을 덮어쓴다. 이미 만든 커밋의 작성자는 바뀌지 않는다.
- 이메일은 GitHub 계정과 연결되는 값이다. 공개를 원하지 않으면 GitHub가 제공하는 noreply 이메일을 등록한다.
- 에이전트가 커밋해도 `user.name`·`user.email`은 학습자 것으로 유지한다.

<CommandLinks />
