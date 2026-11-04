# 운영 문서 목차

- [정적 사이트 배포](../deployment.md): clean dev·정확 SHA CI·키/R2 가드·readback
- [PDF 고정·승인된 교체](../setup/pdf-release.md): 현재 revision과 보존 객체 구분
- [D1 동기화](../setup/d1-sync.md): SQL 생성과 원격 적용의 구분
- [검색 등록·분석](search-analytics.md): 빈 설정 미출력, 소유자 체크리스트
- [카카오 공유](kakao-sharing.md): Web 도메인·키 주입·사전 로드 확인
- [광고 슬롯](advertising.md): 기본 꺼짐, ads.txt 조건부 생성, 개인정보 초안
- [콘텐츠 규칙](../content-style.md): 원본 문체·형식과 수동 린트

## 현재 상태

사이트 구조는 [과정](https://echo.qus0in.dev/git/)과 Wiki의 [강의 목차](https://github.com/qus0in-factory/learn/wiki/Lecture-Index)를 따른다. 운영 문서 자체는 사이트 빌드에서 제외한다.

- PDF 12개의 현재 고정 revision은 `f793e72b02b584cc167dd53c92da9736ded7de7a`다. namespace는 `v0.1.0`이고 제품 정식 릴리스 v0.2.1·dev 목표 v0.2.3과 다르다. 이전 `992baeb3737fad565f42860e75bbc5c502eadfb4`·`0444320a59711d0568077bd9e8ac85daef2d2cda`는 보존 객체다.
- 입력은 `scripts/learn-pdf/pilot/step01.json`–`step12.json`이다. STEP 03은 14장, 나머지 덱은 15장, 합계 179장이다. 개념 레이아웃은 `stat`, `statement`, `split`, `compare`, `steps`, `rows`를 기존 표·코드와 함께 쓴다.
- 사이드바 부록은 `learn-site/.vitepress/appendix-nav.mjs` 기준 17개다. 환경 6, Git 7, 문서·웹 4다.
- 정적 자산 개수 기준은 `scripts/static-assets/settings.json`의 `expectedCount` 256이다. 이 숫자는 라이브 R2 실측이 아니다. 76은 이전 정리 문장이다.
- 배포 보고에서 확인한 Worker version은 `45fe0d1a-d82c-4ff0-a292-db4b0e296623`다. 공식 R2·배포·HTTP 12/12와 QR·퀴즈 마크업은 통과했다. 스크린샷 CDN 추출은 아직 확인 전이라 완료로 적지 않는다.
- 이전 정리의 `/api/catalog`는 강의12/PDF12/퀴즈10, `syncedAt=2026-11-04T00:01:24.134Z`였다. 그 시각은 이번 배포의 현재값으로 단정하지 않는다.
- 일반 사이트 배포는 PDF를 다시 만들거나 D1에 SQL을 적용하지 않는다. 운영 문서 수정은 `docs/lecture`와 `scripts/learn-pdf`만 걷는 source hash 밖이다.
- 소유 확인값·GA4 ID·ads.txt는 비어 있고 분석·광고는 꺼져 있다. 외부 계정 설정은 소유자가 확인한다.
- main 승격·태그·릴리스는 이 정리 범위에 없다. 승인된 작업만 dev에 반영한다.
