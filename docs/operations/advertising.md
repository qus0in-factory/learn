# 광고 슬롯 운영

- 교안별 설정은 frontmatter `ads`로 한다. `ads: off`는 슬롯을 렌더하지 않고, `ads: quote`는 실광고 대신 니체 인용문을 유지한다(실광고 활성화 후에도 인용문). 미지정 시 `ads.json` 기본 동작과 `excludedPaths`를 따른다.
- 실광고는 카카오 애드핏을 사용한다. `ads.json`의 `provider: "adfit"`, `adfitScriptUrl`, 슬롯별 `adfitUnit`(예: `docBottom` 320x100 `DAN-nY46UKb91MZ4L7mi`)으로만 연결하고 코드에 단위 ID·스크립트 URL을 하드코딩하지 않는다. 스크립트는 1회만 비동기 로드하고 라우트 이동 시 새 `ins`를 SDK에 재등록한다. 미충전·실패(`data-ad-onfail`)·차단기 로드 실패·무응답 타임아웃(8초) 시 니체 인용문으로 대체되며, 심사 전에는 인용문이 보이는 것이 정상이다. `ads: quote`인 교안에서는 애드핏을 로드하지 않는다.
- `learn-site/.vitepress/ads.json`의 `adsTxt`는 공급자가 제공한 실제 값일 때만 넣는다. 비어 있으면 파일을 생성하지 않는다. 임의 판매자 ID나 샘플 광고 계정은 배포하지 않는다.
- 직접 업로드 배너 파일을 `docs/public/` 아래에 두고 image에는 `/파일명.webp` 같은 동일 출처 경로를 쓴다. 외부 이미지 URL·데이터 URL은 허용하지 않는다.
- 배너 항목은 image, HTTPS link, alt, 선택적인 start/end를 가진다. 기간은 시간대가 명확한 ISO 8601(예: `2030-01-01T00:00:00Z`)로 지정한다. 시작 시각 포함·종료 시각 제외이며 잘못된 값이면 표시하지 않는다.
- imageWidth/imageHeight는 배너 비율에 맞게 설정한다. 활성화된 기간의 배너는 페이지를 열 때 선택한다. 이미 열린 페이지에서 종료 시각을 넘겼을 때 자동 새로고침하는 기능은 없다.
- 링크는 `rel="sponsored noopener noreferrer"`를 사용하고 광고 표시를 붙인다. 인쇄에서는 숨긴다.
- 공급자가 제공한 실제 ads.txt 값이 있을 때 adsTxt에 넣는다. 비어 있으면 파일을 생성하지 않는다. 임의 판매자 ID나 샘플 광고 계정은 배포하지 않는다.
- 운영자·개인정보 담당 검토와 필요한 동의 방식 확인 후 활성화한다. `/privacy`는 초안이다. 광고사별 스크립트·맞춤 광고·동의 관리 플랫폼은 별도 승인 범위이다.

## 관련 문서

- [운영 목차](index.md) · [배포](../deployment.md) · [분석 설정](search-analytics.md)
- [개인정보처리방침 초안 원본](../privacy.md) · [운영 초안](https://echo.qus0in.dev/privacy)
- [소유자 체크리스트 #20](https://github.com/qus0in-factory/learn/issues/20#issuecomment-6618504571)
