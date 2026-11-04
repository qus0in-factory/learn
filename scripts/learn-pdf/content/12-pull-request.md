---
lecture: 12-pull-request.md
subtitle: "변경을 리뷰하고 병합 결과를 확인한다"
---
# 풀 리퀘스트와 협업
교안: [STEP 12 §학습 목표](https://echo.qus0in.dev/git/12-pull-request#학습-목표)

- 기능 브랜치를 올리고 PR을 만들 수 있다.
- diff를 리뷰하고 변경을 병합할 수 있다.
- 로컬 동기화와 사이트 갱신을 확인할 수 있다.

## PR의 역할
교안: [STEP 12 §핵심 개념](https://echo.qus0in.dev/git/12-pull-request#핵심-개념)

- PR은 브랜치 변경의 검토와 병합을 제안하는 절차다.
- diff로 변경 전후의 차이를 읽는다.
- 혼자 작업할 때도 셀프 리뷰로 의도를 확인한다.

## 동기화와 정리
교안: [STEP 12 §PR 전체 흐름](https://echo.qus0in.dev/git/12-pull-request#pr-전체-흐름)

1. 로컬 메인으로 전환해 원격의 병합 내용을 받는다.
2. 다 쓴 브랜치를 정리한다.
3. Pages 사이트에 변경이 반영되었는지 확인한다.

## 변경 준비와 공유
교안: [STEP 12 §따라하기](https://echo.qus0in.dev/git/12-pull-request#따라하기)

1. 기능 브랜치에서 실제 파일을 수정한다.
2. 상태와 diff를 확인한 뒤 stage 하고 커밋한다.
3. 브랜치를 원격에 올리고 PR을 만든다.

## 리뷰와 병합
교안: [STEP 12 §따라하기](https://echo.qus0in.dev/git/12-pull-request#따라하기)

1. Files changed에서 의도한 변경인지 읽는다.
2. 셀프 리뷰 또는 동료 리뷰의 피드백을 반영한다.
3. 검토를 마친 변경을 병합한다.

## PR 본문 구성
교안: [STEP 12 §PR 본문 예시](https://echo.qus0in.dev/git/12-pull-request#pr-본문-예시)

- 목적에는 변경이 필요한 이유를 쓴다.
- 변경 내용과 확인 결과를 구분한다.
- 남은 한계를 적고 비밀 값은 제외한다.

## 완료 기준
교안: [STEP 12 §체크리스트](https://echo.qus0in.dev/git/12-pull-request#체크리스트)

- PR의 Merged 상태와 로컬 병합 이력을 확인한다.
- 동기화 후 작업 상태가 깨끗한지 확인한다.
- 사이트가 갱신되고 PR 본문에 비밀 값이 없는지 확인한다.
