---
layout: doc
sidebar: false
aside: false
---

# 라이선스

에코익힘책의 코드와 교안 콘텐츠, 사이트 고유 요소, 제3자 자료에 적용되는 조건을 정리한다. 운영자·권리 표시명은 변영인이고 문의는 [qus0in@gmail.com](mailto:qus0in@gmail.com)으로 받는다.

## 적용 범위 요약

| 대상 | 라이선스 | 적용 범위 |
| --- | --- | --- |
| 실행 코드 | MIT | 아래 "코드: MIT"에 적은 디렉터리의 코드·설정 파일. Markdown·텍스트 문서, 라이선스 전문, 이미지·폰트는 제외 |
| 교안 콘텐츠 | CC BY-NC-SA 4.0 | `docs/lecture/`, `course-site/`의 Markdown 문서, `data/learn-quiz.md`, `slides/slides.md`, 교안용 삽화 |
| 사이트 고유 요소 | 별도 허락 없음 | 사이트 이름, 로고, 파비콘, 표지, OG 이미지, 고유 화면 구성과 디자인 |
| 제3자 자료 | 각 제공자 조건 | npm 의존성, 폰트, 아이콘, 외부 SDK |

코드에는 MIT가 적용되므로 상업적 사용, 수정, 재배포가 가능하다. 교안 콘텐츠의 비상업 제한은 코드에 적용되지 않는다. 두 범위를 섞어 해석하지 않는다. 표에 명시하지 않은 코드·콘텐츠·자산에는 별도 사용 허락을 하지 않는다.

## 코드: MIT

`learn-site/`, `course-site/`, `learn-worker/`, `scripts/`, `src/`, `landing/`, `example-site/`, `slides/`의 실행 코드와 설정 파일, `assets/`의 Python 스크립트와 빌드 설정, 루트 `wrangler.jsonc`·`.github/` 워크플로·`docs/public/_headers`·`docs/public/site.webmanifest` 같은 배포 설정은 MIT 라이선스로 제공한다. 루트의 [`LICENSE`](https://github.com/qus0in-factory/learn/blob/main/LICENSE)에 전문이 있다.

- 상업적 사용, 수정, 배포, 사적 사용을 허용한다.
- 소스 코드를 재배포할 때 저작권 고지와 라이선스 고지를 포함한다.
- 같은 디렉터리의 Markdown·텍스트 문서, 라이선스 전문, 이미지·폰트 등 비코드 자산은 MIT 적용 대상이 아니다. 예를 들어 `course-site/git-guide.md`, `scripts/learn-pdf/usage.md`, `scripts/learn-pdf/fonts/*-OFL.txt`, `example-site/README.md`는 코드가 아니다.
- `slides/slides.md`처럼 코드가 아닌 발표 원고는 교안 콘텐츠 범위로 본다.
- `learn-site/.vitepress/theme/icons/logotype.svg`처럼 코드 디렉터리 안에 있는 브랜드 자산은 MIT 적용 대상이 아니다.
- 패키지 메타데이터의 `private` 표시는 라이선스 부여가 아니며, 이 문서의 범위를 바꾸지 않는다.
- SPDX 식별자는 `MIT`이다. 공식 원문은 [Open Source Initiative](https://opensource.org/license/mit)에서 확인한다.

## 교안 콘텐츠 라이선스

`docs/lecture/`의 STEP·부록·명령어 참조, `course-site/`의 Markdown 문서, `data/learn-quiz.md`, `slides/slides.md`, `docs/public/illust-*`와 `assets/illustrations/`의 교안 삽화는 CC BY-NC-SA 4.0으로 제공한다. 루트의 [`LICENSE-CONTENT`](https://github.com/qus0in-factory/learn/blob/main/LICENSE-CONTENT)에 전문이 있다.

- 출처를 표시하고 비상업적으로 사용, 수정, 재배포할 수 있다.
- 수정한 콘텐츠를 배포할 때 변경 사실을 표시하고 같은 라이선스로 공유한다.
- 유료 강의, 광고·구독 수익이 붙은 배포, 상업적 교육 상품 등 상업적 이용에는 별도 허락이 필요하다.
- 기업 내부 교육은 사용 목적과 대가 관계에 따라 비상업 범위에 들 수도 있고 아닐 수도 있다. CC BY-NC-SA 4.0의 비상업 정의와 실제 사용 맥락을 확인하고, 판단이 어려우면 문의한다.
- 교안에 포함된 코드 예제는 MIT 코드로 재사용할 수 있다. 코드 예제를 제외한 설명·도해·연습 문제는 교안 콘텐츠 조건을 따른다.
- SPDX 식별자는 `CC-BY-NC-SA-4.0`이다. 공식 원문은 [Creative Commons](https://creativecommons.org/licenses/by-nc-sa/4.0/)와 [한국어 공식 번역](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.ko)에서 확인한다.

출처 표시 예시는 다음과 같다.

> 에코익힘책(변영인), "문서 제목", https://echo.qus0in.dev/, CC BY-NC-SA 4.0.

## 사이트 고유 요소

사이트 이름 "에코익힘책", 로고와 로고타입, 파비콘, 표지, OG 이미지, 고유한 화면 구성과 디자인은 사이트를 식별하는 브랜드 자산으로 취급한다. MIT와 CC BY-NC-SA 4.0은 이러한 자산에 대한 상표권이나 브랜드 사용 허락을 포함하지 않는다.

대표적으로 `docs/public/header-logo.png`, `docs/public/favicon*`, `docs/public/apple-touch-icon.png`, `docs/public/web-app-manifest*`, `docs/public/og-*`, `docs/public/cover-*`, `docs/public/git-cover-*`, `assets/cover/`·`assets/favicon/`의 생성 이미지 파일, `learn-site/.vitepress/theme/icons/logotype.svg`가 여기에 해당한다. 같은 디렉터리의 Python 스크립트와 JSON 설정은 코드 범위로 본다.

- 코드를 재사용해 별도 사이트를 만들 수 있지만, 에코익힘책의 이름·로고·표지·화면 구성을 그대로 사용해 공식 사이트처럼 보이게 해서는 안 된다.
- 사이트 고유 요소는 비상업적 이용이라도 별도 허락 없이 복제·재배포하지 않는다. 코드 자체를 재사용하는 것과 브랜드 자산을 복제하는 것은 별개다.
- 브랜드 자산의 사용 허락이 필요하면 [qus0in@gmail.com](mailto:qus0in@gmail.com)으로 문의한다.
- 제3자 상표·아이콘·폰트는 각 권리자의 조건을 따른다.

## 제3자 라이선스 및 고지

<!--@include: ./license-notices.md-->

## 권리 확인의 한계

이 문서는 운영자가 권리를 보유한 범위에 대해 라이선스를 적용한다. 저장소의 과거 기여분과 제3자 자료의 권리 승계·재라이선스 동의는 개별 확인되지 않았다. 따라서 이 문서는 해당 기여분이나 제3자 자료의 권리를 운영자에게 있다고 단정하지 않는다.

이 문서는 법률 검토를 대체하지 않는다. 제3자 고지의 누락 없음, SPDX 표기의 정확성, 권리 침해 없음을 보장하지 않는다. 권리 확인이 필요한 자료는 별도로 확인한 뒤 이 문서에 반영한다.

최종 정리: 2026-11-04. 저장소에 반영된 시점부터 적용한다.
