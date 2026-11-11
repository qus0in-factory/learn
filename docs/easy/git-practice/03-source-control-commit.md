---
subtitle: "VS Code 소스 제어 GUI로 파일을 스테이징하고 커밋한다."
tags: ["소스 제어", "add", "commit", "GUI"]
---

# 소스 제어로 커밋

{{ easyNotice }}

출처: [STEP 02 따라하기](/git/02-local-repository), [STEP 03 커밋과 이력 기록](/git/03-commit-history)

VS Code의 소스 제어 화면을 이용하면 마우스 클릭으로 `git add`와 `git commit`을 처리할 수 있다.

1. 왼쪽 활동 막대에서 `소스 제어` 아이콘(가지 모양)을 눌러 변경된 파일 목록을 확인한다. 파일을 누르면 바뀐 부분을 비교해 볼 수 있다. (`git diff`)
2. 커밋에 넣을 파일 옆의 `+` 버튼을 눌러 스테이징 영역에 올린다. (`git add`)
3. 위쪽 입력칸에 커밋 메시지를 쓴다. 예: `feat: 첫 웹페이지 추가`
4. 체크 표시 또는 `커밋` 버튼을 눌러 로컬 저장소에 영구 기록한다. (`git commit -m`)

터미널에서 직접 실행하려면 `git add index.html`, `git commit -m "메시지"`를 차례로 입력한다.
