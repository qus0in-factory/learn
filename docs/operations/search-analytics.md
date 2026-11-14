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
- 설명(description)은 `subtitle` → 경로별 설명 → 과정 요약·제목 조합 순서로 한 함수에서 만든다. easy 강의는 제목과 과정명을 포함해 페이지마다 다른 문장을 쓴다.
- easy 페이지 제목에는 과정 키워드를 붙이고, OG·Twitter 제목·설명·이미지와 `og:locale`·`og:site_name`을 출력한다. JSON-LD에는 `datePublished`를 함께 넣는다.
- `/git/`과 `/git-easy/` 첫 페이지에 서로를 가리키는 링크를 두어 내부 링크를 공급한다.

## 배포 후 기록

배포가 끝나면 아래 값을 채운다. 아직 기록하지 않았다.

| 배포 | 배포일 | dev SHA | Worker version ID |
|---|---|---|---|
| 1차(SEO 1차) | (배포 후 기록) | (배포 후 기록) | (배포 후 기록) |
| 2차(본문·태그) | (배포 후 기록) | (배포 후 기록) | (배포 후 기록) |
| 3차(SEO 2차) | (배포 후 기록) | (배포 후 기록) | (배포 후 기록) |

- Search Console 속성 확인·sitemap 제출 상태: (배포 후 기록)
- 리치 결과 테스트 결과: (배포 후 기록)
- 색인 요청·색인 생성 보고서 확인: (배포 후 기록)

## 배포 후 소유자 체크리스트

전제: Search Console 도메인 속성과 sitemap 제출은 완료된 기록이 있고, 콘솔의 현재 상태는 확인하지 않았다.

1. 1차 배포 직후 URL 검사에서 "색인 생성 요청"을 한다. `/git-easy/`, `/git-easy/01-what-is-github`, `/git-easy/02-ai-and-github`, `/git-easy/04-what-is-git-cli`, `/git-easy/05-git-principle` 순서다. 하루 한도가 약 10건이므로 다음 날 `github-practice/` 4건과 `git-practice/` 4건, 셋째 날 `/git-easy/glossary`를 요청한다. `/git-easy/tags`는 2차 배포 뒤에 요청한다.
2. 1차 배포 직후 sitemap을 다시 제출하고 상태가 "성공"인지, 발견 URL이 69개(2차 배포 뒤 70개)인지 확인한다.
3. 배포 당일 [리치 결과 테스트](https://search.google.com/test/rich-results)에 `/git-easy/`와 easy 강의 1쪽을 넣어 Course·LearningResource·BreadcrumbList 오류가 0건인지 확인한다. 오류가 있으면 3차 배포 전에 고친다.
4. 3~5일 뒤 페이지 색인 생성 보고서에서 git-easy URL 상태를 본다. "크롤링됨 – 현재 색인이 생성되지 않음"이면 1번을 다시 요청하고, "발견됨 – 미색인"이면 내부 링크를 먼저 보강한다.
5. 선택 사항으로 이미 색인된 외부 페이지(GitHub 조직 README, X 프로필, 수강생 공유 링크)에 `/git-easy/` 링크를 추가한다. 2주 안의 발견에 가장 영향이 크다.
6. Bing Webmaster Tools 등록·IndexNow 키, Google 소유 확인 HTML 태그 추가는 비용·계정·승인이 필요한 별도 범위다. 도메인 속성이면 HTML 태그는 필요 없다.

색인 요청·sitemap·내부 링크는 2주 안의 발견을 돕지만 색인과 노출을 보장하지 않는다.

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
