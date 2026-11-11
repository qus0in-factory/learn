---
subtitle: "Git이 파일 변경을 기록하는 세 영역을 이해한다."
---

# Git의 원리

{{ easyNotice }}

출처: [STEP 01 버전 관리의 세 영역](/git/01-environment)

## 로컬 3단계 구조와 상태 변화

Git은 파일 변경을 무작정 저장하지 않고 확실히 구분되는 3단계를 거친다.

```mermaid
flowchart TB
    WD["작업 공간<br/>(Working Directory)"] -->|git add| SA["스테이징 영역<br/>(Staging Area)"]
    SA -->|git commit| LR["로컬 저장소<br/>(Local Repository)"]
```

세 영역은 마트에서 물건을 구매하는 과정에 비유하면 쉽게 이해할 수 있다:

1. **작업 공간 (Working Directory)**
   - VS Code에서 파일을 열고 코드를 입력하고 저장하는 현재 작업 폴더이다.
   - 마트의 진열대에서 물건을 살펴보고 손에 집어 드는 단계와 같다.
2. **스테이징 영역 (Staging Area / Index)**
   - 작업 공간에서 수정한 파일 중, 이번 저장 기록(커밋)에 포함할 파일만 골라 올려두는 대기 장소이다.
   - 장바구니나 쇼핑 카트에 구매할 물건만 골라 담는 단계와 같다.
3. **로컬 저장소 (Local Repository)**
   - 카트에 담긴 파일들의 현재 상태를 영구적인 스냅샷으로 확정하여 저장소 폴더 안의 전용 데이터베이스(`.git`)에 안전하게 보관하는 앨범이다.
   - 카트의 물건들을 계산대에서 결제하고 영수증을 발행받아 보관하는 단계와 같다.

<Illustration name="stages" alt="작업 공간에서 스테이징 영역을 거쳐 로컬 저장소로 파일 변경이 옮겨지는 3단계 흐름" />
