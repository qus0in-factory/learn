# 운영 문서 목차

- [정적 사이트 배포](../deployment.md): clean dev·정확 SHA CI·키/R2 가드·readback
- [PDF 고정·승인된 교체](../setup/pdf-release.md): 현재 revision과 보존 객체 구분
- [D1 동기화](../setup/d1-sync.md): SQL 생성과 원격 적용의 구분
- [검색 등록·분석](search-analytics.md): 빈 설정 미출력, 소유자 체크리스트
- [카카오 공유](kakao-sharing.md): Web 도메인·키 주입·사전 로드 확인
- [광고 슬롯](advertising.md): 기본 꺼짐, ads.txt 조건부 생성, 개인정보 초안
- [콘텐츠 규칙](../content-style.md): 원본 문체·형식과 수동 린트
- [교재 구조 프레임워크](../course-framework.md): 새 과정 구조·메타·내비·SEO 계약·등록 체크리스트
- [Git 교안과 PDF 보강 회고 및 부검](pdf-training-retrospective.md): 편집 재작업·명령 검토·렌더링·배포 완료 기준
- [Git·GitHub 교안과 SEO 보강 회고 및 부검](117-seo-retrospective.md): 런타임 차이·배포 가드·구조화 데이터·작업 인계 기준

## 현재 상태

사이트 구조는 [과정](https://echo.qus0in.dev/git/)과 Wiki의 [강의 목차](https://github.com/qus0in-factory/learn/wiki/Lecture-Index)를 따른다. 운영 문서 자체는 사이트 빌드에서 제외한다.

- 2026-11-15 정리 기준 운영 dev는 `e9e833d35461e6ef22fac25b3ccf958f7961feb3`, main은 [PR #127](https://github.com/qus0in-factory/learn/pull/127)의 `ace5d2c1b9451e943538f776c071f6f34a5136d7`이다. #126 easy 사이드바 독립 섹션과 `Go Git 集 순한맛` 과정명 통일을 반영했다. [CI 43603774351](https://github.com/qus0in-factory/learn/actions/runs/43603774351) success, Worker `2ba03186-e114-424b-8c31-443f108bd58a`, readback 5항목·26 probe PASS다. 이 배포에서 PDF·D1은 변경하지 않았다.
- #107·#117·#118·#120·#124·#126은 닫혔고 PR #121·#122·#123·#125·#127은 main에 병합됐다. 열린 이슈는 [#119](https://github.com/qus0in-factory/learn/issues/119) 하나다. 리치 결과 오류 해소와 첫 색인 요청은 확인됐고 추가 색인 요청·색인 생성 보고서 확인이 소유자 작업으로 남았다.
- PDF 12개의 현재 고정 revision은 `6e8aed6c038f0da51751ab3cbadec21fd670fbea`이고, easy PDF 12개의 현재 고정 revision은 `af38ae80aa4a2b447eb9ec35799cf09deb7c9c1d`다. namespace는 `v0.1.0`이고 제품 정식 릴리스 v0.2.1·dev 목표 v0.2.3과 다르다. 이전 `dd849e121a06f0e6e0c414bef600541f97991af3`·`f793e72b02b584cc167dd53c92da9736ded7de7a`·`992baeb3737fad565f42860e75bbc5c502eadfb4`·`0444320a59711d0568077bd9e8ac85daef2d2cda`는 보존 객체다.
- 입력은 `scripts/learn-pdf/pilot/step01.json`–`step12.json`이다. 각 덱은 20–24장이고 합계 270장이다. 개념 레이아웃은 `stat`, `statement`, `split`, `compare`, `steps`, `rows`를 기존 표·코드와 함께 쓴다.
- #118 새 PDF 12개/270장은 R2 12/12 크기·SHA 검증과 refreeze를 완료했다. STEP02 설정 조회·삭제와 STEP06 계정 사이트 장이 각각 1장 추가돼 기존 268장보다 2장 늘었다. 2026-11-14 배포로 사이트·D1·Worker 전환이 완료됐다(dev `20be3c9`, CI run 43602264816 success, Worker version `70a95384-9fe4-44bd-85a9-6faeddb52dae`, D1 remote apply 16 queries·162 rows, PDF revision `6e8aed6c…` 12개/270장, 보존 revision `dd849e1…`). 함께 배포된 변경은 #124 사이드바 구조 통일과 푸터 GitHub 링크다. HTTP readback PASS: verify-learn-http 12+12, R2 12/12, readback 26 probe, /api/catalog 12/12/10, PDF 버튼 새 revision, 보존 revision dd849e1 200, 사이드바·푸터·JSON-LD.
- 사이드바 부록은 `learn-site/.vitepress/appendix-nav.mjs` 기준 17개다. 환경 6, Git 7, 문서·웹 4다.
- 정적 자산 개수 기준은 `scripts/static-assets/settings.json`의 `expectedCount` 256이다. 이 숫자는 라이브 R2 실측이 아니다. 76은 이전 정리 문장이다.
- 2026-11-14 2차 배포 SHA는 `22d769e42aa349d497ccf3a8aaf6da633dc1cab5`이고 [동일 SHA CI](https://github.com/qus0in-factory/learn/actions/runs/43596356260)가 성공했다. Worker version은 `b84ac4b6-747a-4e3e-bb5e-97ffffa861fc`다. description 47쪽 보강, tags·catalog `CollectionPage`·용어사전 `mainEntity`, 홈 `WebSite.description`, `og:image` alt 정합, git 03 `vim`/`:cq` 안내, easy PDF 덱 동기화·재빌드(revision `af38ae80aa4a2b447eb9ec35799cf09deb7c9c1d`, R2 12/12), git-easy Gist 1건 갱신, 과정 판별 정리를 포함하며 readback 10개 항목·26개 probe와 sitemap 70을 확인했다. 당시 후속 이슈는 [#118](https://github.com/qus0in-factory/learn/issues/118)(git PDF 교체)·[#119](https://github.com/qus0in-factory/learn/issues/119)(Search Console)이다.
- 2026-11-14 1차 배포 SHA는 `09b705c6284b8828d966d0aadbeaedc2c072a207`이고 [동일 SHA CI](https://github.com/qus0in-factory/learn/actions/runs/43593271917)가 성공했다. Worker version은 `b5614ac6-5d81-4f9b-9fce-771be985e7fd`다. readback 26개 probe, `/git-easy/` Course·`hasPart` 12, easy 강의 `article` 메타·lastmod 일치, sitemap 70(태그 포함), 두 과정 교차 링크, `/git/01-environment` 회귀 없음, 카탈로그 강의12/PDF12/퀴즈10을 확인했다.
- 이전 2026-11-07 배포 SHA는 `8fa748f4a0f6f13a658ff0f627c9eceeb4d4f981`이고 [동일 SHA CI](https://github.com/qus0in-factory/learn/actions/runs/42365445102)가 성공했다. Worker version은 `1b86a5c1-9054-43e5-9fc4-2e0c5abaf22e`다. PDF 12개·268장과 정적 자산 256개의 원격 크기·SHA, PDF 리다이렉트·불변 URL·사이트 버튼·카탈로그 12/12를 검증했다. 과정 첫 화면과 스크린샷 10개도 공개 응답으로 확인했다.
- `/api/catalog`의 공개 응답은 강의12/PDF12/퀴즈10이고, PDF URL은 고정 revision `6e8aed6c038f0da51751ab3cbadec21fd670fbea`를 가리킨다. #118 readback의 `syncedAt`은 `2026-11-14T13:57:37.960Z`다.
- 일반 사이트 배포는 PDF를 다시 만들거나 D1에 SQL을 적용하지 않는다. 운영 문서 수정은 `docs/lecture`와 `scripts/learn-pdf`만 걷는 source hash 밖이다.
- 소유 확인값은 비어 있어 `google-site-verification` 메타를 출력하지 않는다. GA4 측정 ID `G-EW8F5DZMYG`로 분석을 켰고 모든 페이지 head에 gtag.js를 출력한다. `ads.txt`는 없고(404), 카카오 애드핏 docBottom 광고 슬롯은 켜져 있다. 외부 계정 설정은 소유자가 확인한다.
- main은 PR #127까지 반영됐다. 정식 릴리스는 v0.2.1을 유지하며 새 태그·릴리스를 발행한 것은 아니다. 이번 문서 정리는 배포하지 않는다.
