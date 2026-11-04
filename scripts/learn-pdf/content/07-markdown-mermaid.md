---
lecture: 07-markdown-mermaid.md
subtitle: "README와 흐름도로 프로젝트를 설명한다"
---
# 마크다운과 다이어그램
교안: [STEP 07 §학습 목표](https://echo.qus0in.dev/git/07-markdown-mermaid#학습-목표)

- Markdown으로 프로젝트 소개 README를 작성한다.
- Mermaid로 Git 흐름을 그림으로 나타낸다.
- 미리보기로 확인한 뒤 커밋하고 원격에 반영한다.

## README가 필요한 이유
교안: [STEP 07 §왜 필요한가](https://echo.qus0in.dev/git/07-markdown-mermaid#왜-필요한가)

- README는 저장소 첫 화면에 자동으로 보인다.
- 목적, 배포 주소, 기술 스택, 작업 흐름을 짧게 정리한다.
- Mermaid는 텍스트라서 문서와 함께 버전 관리된다.

## 핵심 개념
교안: [STEP 07 §핵심 개념](https://echo.qus0in.dev/git/07-markdown-mermaid#핵심-개념)

- Markdown은 제목, 목록, 링크, 표, 코드 블록, 체크리스트를 표현한다.
- Mermaid는 텍스트 코드로 흐름도를 그린다.
- 편집기와 GitHub 양쪽에서 표시를 확인한다.

## 문법 요소
교안: [STEP 07 §마크다운 기본 문법](https://echo.qus0in.dev/git/07-markdown-mermaid#마크다운-기본-문법)

| 요소 | 쓰임 |
| --- | --- |
| 제목·목록 | 문서 구조 |
| 링크·이미지 | 참조 연결 |
| 표·체크리스트 | 정보와 계획 정리 |
| 코드 블록 | 코드와 Mermaid 삽입 |

## 작성과 반영 순서
교안: [STEP 07 §따라하기](https://echo.qus0in.dev/git/07-markdown-mermaid#따라하기)

1. 루트에 README를 만들고 미리보기를 연다.
2. 제목, 소개, 배포 주소, 기술 스택, 흐름도를 쓴다.
3. Mermaid가 렌더링되는지 확인한다.
4. 변경 확인 후 stage, 커밋, 푸시한다.

## 흐름도의 내용
교안: [STEP 07 §Mermaid 코드](https://echo.qus0in.dev/git/07-markdown-mermaid#mermaid-코드)

```mermaid
flowchart LR
    A[작업 폴더] --> B[스테이징]
    B --> C[로컬 저장소]
    C --> D[GitHub]
```

## 완료 기준
교안: [STEP 07 §체크리스트](https://echo.qus0in.dev/git/07-markdown-mermaid#체크리스트)

- 미리보기와 GitHub에서 README와 Mermaid가 표시된다.
- 배포 주소 링크가 열린다.
- 작업 상태가 깨끗하다.

## 주의할 점
교안: [STEP 07 §주의할 점](https://echo.qus0in.dev/git/07-markdown-mermaid#주의할-점)

- README에 비밀 값, 토큰, 비밀번호를 적지 않는다.
- 공개 저장소이므로 배포 주소와 소개 문구만 노출한다.
- 렌더링 실패나 push 거절은 교안 트러블 슈팅으로 확인한다.
