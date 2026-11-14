# 검색 등록과 분석 설정

## 현재 상태

- 정규 주소는 `https://echo.qus0in.dev`이다.
- 사이트맵은 `/sitemap.xml`, 크롤러 안내는 `/robots.txt`이다.
- 소유 확인 값은 비어 있다. GA4 측정 ID `G-EW8F5DZMYG`를 넣고 분석을 켰다. 모든 페이지 head에 gtag.js 태그를 출력한다.
- 소유 확인 값이 비어 있는 이유는 기록상 Search Console 속성이 도메인 속성이고 DNS로 확인하기 때문이다. URL 접두어 속성으로 확인할 때만 `googleSiteVerification` 값을 채운다.
- 클라이언트 라우터 이동의 page_view는 GA4 향상된 측정의 "브라우저 기록 이벤트 기반 페이지 변경" 옵션으로 수집한다. 코드에서 별도 이벤트를 보내지 않는다.
- 설정은 `learn-site/.vitepress/integrations.json`에서 관리한다. 소유 확인 토큰과 측정 ID는 공개 식별자이다. API 비밀키나 서비스 계정 키를 넣지 않는다.

### #117 SEO 1차

- `/git-easy/` 첫 페이지는 `Course`, easy 12개 강의는 `LearningResource`로 출력한다. easy 과정 첫 페이지의 `hasPart`에 12개 강의를 넣고, easy 과정에는 `educationalLevel: Beginner`, 모든 강의에는 `learningResourceType: Lesson`, `isAccessibleForFree: true`, 대표 `image`를 붙인다.
- easy 강의는 `og:type=article`과 `article:published_time`·`article:modified_time`을 출력한다. modified 값은 sitemap lastmod와 같은 함수로 계산해 서로 일치한다.
- 설명(description)은 frontmatter `description` → `seo-meta.json descriptions[path]` → 기존 subtitle·과정 요약·제목 조합 폴백 순서로 한 함수에서 만든다. 화면의 subtitle은 유지하고 SEO 전용 설명을 우선한다. 색인 대상 70페이지는 40~90자·중복 0으로 검증했다.
- easy 페이지 제목에는 과정 키워드를 붙이고, OG·Twitter 제목·설명·이미지와 `og:locale`·`og:site_name`을 출력한다. JSON-LD에는 `datePublished`를 함께 넣는다.
- `/git/`과 `/git-easy/` 첫 페이지에 서로를 가리키는 링크를 두어 내부 링크를 공급한다.

## 배포 후 기록

2026-11-15 정리 기준이다. 운영 dev는 `e9e833d`, main은 PR #127의 `ace5d2c`이며, 아래 값은 보존한 배포·readback 기록과 GitHub 이슈를 대조했다. 이번 정리에서 배포나 Search Console 계정 작업을 다시 실행하지 않았다.

| 배포 | 배포일 | dev SHA | Worker version ID |
|---|---|---|---|
| 1차(SEO 1차) | 2026-11-14 | `09b705c6284b8828d966d0aadbeaedc2c072a207` | `b5614ac6-5d81-4f9b-9fce-771be985e7fd` |
| 2차(본문·태그) | 2026-11-14 | `22d769e42aa349d497ccf3a8aaf6da633dc1cab5` | `b84ac4b6-747a-4e3e-bb5e-97ffffa861fc` |
| PDF·내비 전환(#118·#124) | 2026-11-14 | `20be3c961e0114eb2444ed0dc149b9accf586209` | `70a95384-9fe4-44bd-85a9-6faeddb52dae` |
| 과정명·사이드바 수정(#126) | 2026-11-14 | `e9e833d35461e6ef22fac25b3ccf958f7961feb3` | `2ba03186-e114-424b-8c31-443f108bd58a` |

- 1차 CI: [run 43593271917](https://github.com/qus0in-factory/learn/actions/runs/43593271917) success. readback 26개 probe, `/git-easy/` Course·`hasPart` 12, easy 강의 `article` 메타·lastmod 일치, sitemap 70(태그 포함), 두 과정 교차 링크, `/git/01-environment` 회귀 없음, 카탈로그 강의12/PDF12/퀴즈10이 PASS했다.
- 2차 CI: [run 43596356260](https://github.com/qus0in-factory/learn/actions/runs/43596356260) success. description 47쪽 보강, tags·catalog `CollectionPage`·용어사전 `mainEntity`, 홈 `WebSite.description`, `og:image` alt 정합, git 03 `vim`/`:cq` 안내, easy PDF 덱 동기화·재빌드(revision `af38ae80aa4a2b447eb9ec35799cf09deb7c9c1d`, R2 12/12), git-easy Gist 1건 갱신, 과정 판별 정리를 포함하며 readback 10개 항목·26개 probe와 sitemap 70이 PASS했다.
- #118·#124 배포: [CI 43602264816](https://github.com/qus0in-factory/learn/actions/runs/43602264816) success. git PDF 12개/270장·revision `6e8aed6c038f0da51751ab3cbadec21fd670fbea` 전환, R2 12/12, HTTP·카탈로그 12/12/10과 이전 revision 보존을 확인했다.
- #126 배포: [CI 43603774351](https://github.com/qus0in-factory/learn/actions/runs/43603774351) success. `Go Git 集 순한맛` 과정명과 easy 하단 독립 섹션, H1·title·OG·Course.name·공개 DOM readback 5항목을 확인했다. PDF·D1 변경은 없다.
- [#119 확인 기록](https://github.com/qus0in-factory/learn/issues/119#issuecomment-6878026184): 2026-11-14 sitemap 재제출 성공·발견 URL 약 70, 첫 색인 요청, 구조화 데이터 수정 후 `2026-11-14T13:30` easy 첫 레슨의 리치 결과 재테스트 통과(유효한 탐색경로 1개·교육과정 오류 해소)가 기록됐다. 리치 결과 통과를 검색 색인 완료로 해석하지 않는다.
- [#120](https://github.com/qus0in-factory/learn/issues/120) 프로필의 두 과정 링크 반영은 완료·종료됐다. #107·#117·#118·#124·#126도 닫혔으며, 남은 열린 이슈는 소유자 작업 [#119](https://github.com/qus0in-factory/learn/issues/119)다.

## 남은 소유자 작업(#119)

Search Console 도메인 속성·sitemap 제출·첫 색인 요청·리치 결과 재테스트는 이슈에 완료로 기록됐다. 다음 항목은 아직 미완료이며 자동으로 완료 표시하지 않는다.

1. `github-practice/` 4쪽과 `git-practice/` 4쪽의 색인을 요청한다. 계정의 실제 요청 가능 한도에 맞춰 나눈다.
2. `/git-easy/glossary`와 `/git-easy/tags`의 색인을 요청한다.
3. 첫 요청 3~5일 뒤 페이지 색인 생성 보고서에서 git-easy URL 상태를 확인하고 결과를 #119에 남긴다. 발견·크롤링·색인·검색 노출을 각각 구분한다.

Bing·IndexNow는 이번 세션에서 진행하지 않았다. 색인 요청·sitemap·내부 링크는 발견을 도울 수 있지만, 2주 안의 색인과 노출을 보장하지 않는다.

## 서치 콘솔

1. 소유자가 기존 Google 계정으로 Search Console에 접속한다. 자동 계정 생성이나 속성 등록은 하지 않는다.
2. 기록상 속성은 도메인 속성이며 DNS TXT로 확인한다. URL 접두어 속성을 따로 만들 때는 `https://echo.qus0in.dev/`를 쓴다.
3. URL 접두어 속성으로 확인할 때만 HTML 태그 방식의 content 값을 `googleSiteVerification`에 넣는다. 빈 값이면 메타 태그를 내보내지 않는다.
4. dev 검증·배포 후 실제 HTML과 콘솔 상태를 확인한다. 도메인 속성은 DNS TXT 전파를 확인하고, URL 접두어 속성은 소유 확인 태그를 확인한 뒤 콘솔에서 확인을 누른다.
5. `https://echo.qus0in.dev/sitemap.xml`을 제출한다. 주요 강의 URL을 검사하고 처리 결과를 확인한다. 제출이 색인이나 순위를 보장하지 않는다.

## GA4

1. 소유자가 기존 GA4 웹 데이터 스트림의 측정 ID를 확인한다. 유료 전환이나 새 계정 생성은 자동으로 하지 않는다.
2. 개인정보처리방침·필요한 동의 방식·보관 기간을 검토한다. 현재 초안만으로 분석을 켜지 않는다.
3. `ga4MeasurementId`에 `G-` 형식의 ID를 넣고 승인 후 `analyticsEnabled`를 true로 바꾼다. 둘 다 있어야 스크립트가 출력된다.
4. 배포 후 태그·네트워크·GA4 실시간 보고서를 소유자가 확인한다. 앱 내 페이지 이동 추적이나 동의 관리 플랫폼은 이번 최소 구현 범위에 없다.
5. 비활성화할 때 `analyticsEnabled`를 false로 바꾸고 배포한다. ID가 비어 있어도 분석 태그는 출력하지 않는다.

## 관련 문서

- [운영 목차](index.md) · [배포](../deployment.md) · [카카오 도메인](kakao-sharing.md)
- [광고·개인정보 초안](advertising.md)
- [소유자 체크리스트 #21](https://github.com/qus0in-factory/learn/issues/21#issuecomment-6608251650)
