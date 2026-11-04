# 운영 문서 목차

- [정적 사이트 배포](../deployment.md): clean dev·정확 SHA CI·키/R2 가드·readback
- [PDF 고정·승인된 교체](../setup/pdf-release.md): 현재 992baeb revision, 옛 객체 보존
- [D1 동기화](../setup/d1-sync.md): SQL 생성과 원격 적용의 구분
- [검색 등록·분석](search-analytics.md): 빈 설정 미출력, 소유자 체크리스트
- [카카오 공유](kakao-sharing.md): Web 도메인·키 주입·사전 로드 확인
- [광고 슬롯](advertising.md): 기본 꺼짐, ads.txt 조건부 생성, 개인정보 초안
- [콘텐츠 규칙](../content-style.md): 원본 문체·형식과 수동 린트

## 현재 상태

사이트 구조는 [과정](https://echo.qus0in.dev/git/)과 Wiki의 [강의 목차](https://github.com/qus0in-factory/learn/wiki/Lecture-Index)를 따른다. 운영 문서 자체는 사이트 빌드에서 제외한다.

- PDF 12개는 `992baeb3737fad565f42860e75bbc5c502eadfb4`로 재고정됐다. 제품 정식 릴리스 v0.2.1·PDF namespace v0.1.0·dev 목표 v0.2.3은 서로 다른 값이다.
- 정리 시 `/api/catalog`는 강의12/PDF12/퀴즈10, `syncedAt=2026-11-04T00:01:24.134Z`를 반환했다. 본문·새 빈칸 퀴즈 UI의 게시와 D1 재동기화는 별개다.
- 정적 자산 manifest는 76개이다. 일반 사이트 배포는 PDF를 다시 만들거나 D1에 SQL을 적용하지 않는다.
- 소유 확인값·GA4 ID·ads.txt는 비어 있고 분석·광고는 꺼져 있다. 외부 계정 설정은 소유자가 확인한다.
- main 승격·태그·릴리스는 이 정리 범위에 없다. 승인된 작업만 dev에 반영한다.
