# 검색 등록과 분석 설정

## 현재 상태

- 정규 주소는 `https://echo.qus0in.dev`이다.
- 사이트맵은 `/sitemap.xml`, 크롤러 안내는 `/robots.txt`이다.
- 소유 확인 값과 GA4 측정 ID는 비어 있고 분석은 꺼져 있다. 태그나 분석 요청을 출력하지 않는다.
- 설정은 `learn-site/.vitepress/integrations.json`에서 관리한다. 소유 확인 토큰과 측정 ID는 공개 식별자이다. API 비밀키나 서비스 계정 키를 넣지 않는다.

## 서치 콘솔

1. 소유자가 기존 Google 계정으로 Search Console에 접속한다. 자동 계정 생성이나 속성 등록은 하지 않는다.
2. URL 접두어 속성 `https://echo.qus0in.dev/`를 추가한다. 도메인 속성을 선택하면 DNS 확인은 소유자가 직접 처리한다.
3. HTML 태그 방식의 content 값만 `googleSiteVerification`에 넣는다. 빈 값이면 메타 태그를 내보내지 않는다.
4. dev 검증·배포 후 실제 HTML의 소유 확인 태그를 확인하고 콘솔에서 확인을 누른다.
5. `https://echo.qus0in.dev/sitemap.xml`을 제출한다. 주요 강의 URL을 검사하고 처리 결과를 확인한다. 제출이 색인이나 순위를 보장하지 않는다.

## GA4

1. 소유자가 기존 GA4 웹 데이터 스트림의 측정 ID를 확인한다. 유료 전환이나 새 계정 생성은 자동으로 하지 않는다.
2. 개인정보처리방침·필요한 동의 방식·보관 기간을 검토한다. 현재 초안만으로 분석을 켜지 않는다.
3. `ga4MeasurementId`에 `G-` 형식의 ID를 넣고 승인 후 `analyticsEnabled`를 true로 바꾼다. 둘 다 있어야 스크립트가 출력된다.
4. 배포 후 태그·네트워크·GA4 실시간 보고서를 소유자가 확인한다. 앱 내 페이지 이동 추적이나 동의 관리 플랫폼은 이번 최소 구현 범위에 없다.
5. 비활성화할 때 `analyticsEnabled`를 false로 바꾸고 배포한다. ID가 비어 있어도 분석 태그는 출력하지 않는다.
