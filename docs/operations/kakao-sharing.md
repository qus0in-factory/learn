# 카카오 공유 운영

## 설정과 확인

- 운영 Web origin은 `https://echo.qus0in.dev`이다. 앱의 Web 사이트 도메인과 공유 링크 허용 설정은 운영자가 Kakao Developers에서 확인한다. SDK 초기화만으로 콘솔 설정까지 검증됐다고 보지 않는다.
- JavaScript 키는 보호된 메인 env-file의 `VITE_KAKAO_JS_KEY`로 빌드에 주입한다. 브라우저에서 쓰는 공개 클라이언트 키지만 문서·로그·채팅에 값이나 키 해시를 출력하지 않는다. 서버용 비밀 키를 대신 넣지 않는다.
- 기존 정적 배포 가드가 env 키의 형식·길이32와 중첩 JS 번들 포함 여부를 검사한다. 누락·불일치면 배포 전에 중단한다. 키나 새 단계를 CI에 넣지 않는다.
- SDK URL·SRI는 `learn-site/.vitepress/kakao-sdk.mjs` 설정을 쓴다. 페이지 idle에 SDK를 미리 로드·초기화하고 준비된 클릭에서 공유 호출을 실행한다.
- 배포 후 버튼 활성·클릭 전 SDK 초기화·중복 로드 없음·OG 이미지 200을 확인한다. Safari·인앱 브라우저의 실제 팝업 정책까지 에뮬레이션으로 보장하지 않는다.

## 소유자 할 일

- [ ] 앱의 Web 플랫폼에 `https://echo.qus0in.dev` 등록·허용 상태를 확인한다.
- [ ] JavaScript 키가 해당 앱의 값인지 보호된 환경에서 확인한다.
- [ ] 실제 카카오톡·Safari·인앱 브라우저에서 공유 동작을 확인한다.
- [ ] 오래된 미리보기는 [공유 디버거](https://developers.kakao.com/tool/debugger/sharing)에서 캐시를 확인한다.

키·SRI·초기화·도메인·팝업 오류를 구분해 조사하고 원인 확인 전 반복 배포하지 않는다. 사용자 메시지를 자동으로 보내지 않는다.

## 관련 문서

- [배포](../deployment.md) · [운영 목차](index.md) · [분석·소유 확인](search-analytics.md)
- [키 발급·운영 근거 #39](https://github.com/qus0in-factory/learn/issues/39)
