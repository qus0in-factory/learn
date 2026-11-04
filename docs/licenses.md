---
layout: doc
sidebar: false
aside: false
---

# 라이선스

에코익힘책은 코드와 교안 콘텐츠에 서로 다른 라이선스를 적용합니다. 권리자는 변영인이며, 사용 허락이나 상업적 이용에 관한 문의는 [qus0in@gmail.com](mailto:qus0in@gmail.com)으로 받습니다.

## 한눈에 보기

| 대상 | 라이선스 | 요약 |
| --- | --- | --- |
| 코드 | [MIT](https://opensource.org/license/mit) | 상업적 이용을 포함해 자유롭게 사용·수정·배포할 수 있습니다. |
| 교안 콘텐츠 | [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ko) | 출처를 밝히면 비상업 목적으로 사용·수정·배포할 수 있고, 변경본은 같은 조건으로 공유해야 합니다. |
| 사이트 고유 브랜드 | 별도 허락 필요 | 사이트 이름, 로고, 표지 등은 허락 없이 사용할 수 없습니다. |
| 제3자 자료 | 각 원 조건 | 의존 패키지, 폰트, 아이콘, 외부 SDK는 제공자의 조건을 따릅니다. |

## 무엇에 어떤 라이선스가 적용되나요

| 구분 | 해당 파일 | 라이선스 |
| --- | --- | --- |
| 코드 | `learn-site/`, `course-site/`, `learn-worker/`, `scripts/`, `src/`, `landing/`, `example-site/`, `slides/`의 소스 코드와 설정, 루트의 `wrangler.jsonc`, `.github/` 워크플로 | MIT |
| 교안 콘텐츠 | `docs/lecture/`의 STEP·부록·명령어 참조, `course-site/`의 Markdown 문서, `data/learn-quiz.md`, `slides/slides.md`, 교안 삽화(`docs/public/illust-*`, `assets/illustrations/`) | CC BY-NC-SA 4.0 |
| 사이트 고유 브랜드 | 사이트 이름 "에코익힘책", `docs/public/header-logo.png`, 파비콘, `apple-touch-icon.png`, 웹앱 아이콘, 표지(`cover-*`, `git-cover-*`), OG 이미지(`og-*`), `logotype.svg`, 고유한 화면 구성과 디자인 | 별도 허락 필요 |
| 제3자 자료 | 아래 [제3자 라이선스 및 고지](#제3자-라이선스-및-고지)에 적은 항목 | 각 원 조건 |

같은 디렉터리 안에서도 파일 성격에 따라 적용되는 조건이 다릅니다. 예를 들어 `scripts/` 안의 Python 스크립트는 MIT이지만 같은 위치의 `usage.md` 같은 운영 문서는 MIT 대상이 아닙니다. 위 표에 없는 파일은 별도 허락이 필요하므로 사용하기 전에 문의해 주세요.

## 코드: MIT

루트의 [`LICENSE`](https://github.com/qus0in-factory/learn/blob/main/LICENSE)에 전문이 있습니다.

**허용**
- 상업적 이용, 수정, 배포, 사적 이용
- 교안에 실린 코드 예제의 복사와 재사용

**조건**
- 소스 코드를 재배포할 때 저작권 고지와 MIT 라이선스 고지를 함께 포함합니다.

**제외**
- 코드 디렉터리 안에 있더라도 로고, 이미지, 폰트, 라이선스 전문 같은 비코드 자산은 MIT 대상이 아닙니다.
- 코드에는 교안 콘텐츠의 비상업 제한이 적용되지 않습니다.

## 교안 콘텐츠: CC BY-NC-SA 4.0

루트의 [`LICENSE-CONTENT`](https://github.com/qus0in-factory/learn/blob/main/LICENSE-CONTENT)에 전문이 있습니다. 공식 원문은 [Creative Commons 안내](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ko), [한국어 번역](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.ko), [영문 법적 고지](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode)에서 볼 수 있습니다.

**허용**
- 복사와 재배포
- 번역, 발췌, 재구성 같은 수정과 2차 저작물 제작
- 수업, 스터디, 개인 학습처럼 비상업적인 목적의 사용

**조건**
- 출처 표시: 제목, 저작자, 출처 주소, 라이선스를 밝히고 변경했다면 그 사실을 적습니다.
- 비상업: 상업적 이익을 주된 목적으로 하는 사용은 허용되지 않습니다.
- 동일조건변경허락: 변경해서 공유하는 결과물에도 같은 CC BY-NC-SA 4.0을 적용합니다.

**금지**
- 유료 강의, 유료 교재, 광고·구독 수익이 붙은 배포 등 상업적 이용 (사전 허락을 받은 경우는 예외입니다)
- 라이선스 조건을 바꾸거나 더 강한 제한을 덧붙이는 재배포
- 저작자가 이 변경본을 보증하거나 후원하는 것처럼 보이게 하는 표시

기업 내부 교육처럼 경계에 있는 사용은 목적과 대가 관계에 따라 비상업 범위에 해당할 수도, 아닐 수도 있습니다. 판단이 어렵다면 사용하기 전에 문의해 주세요.

### 출처 표시 예시

Creative Commons가 권장하는 [제목·저작자·출처·라이선스(TASL)](https://wiki.creativecommons.org/wiki/Recommended_practices_for_attribution) 순서를 따릅니다.

> "[제목]"([문서 주소]), 변영인, 에코익힘책(https://echo.qus0in.dev/), [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ko)

내용을 바꾸었다면 마지막에 "원문에서 일부 수정함"처럼 변경 사실을 덧붙이고, 자신의 결과물에도 같은 라이선스를 표시합니다.

> "[제목]"([문서 주소]), 변영인, 에코익힘책(https://echo.qus0in.dev/), [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ko). 3장을 요약하고 예제를 바꾸었습니다. 이 변경본도 CC BY-NC-SA 4.0으로 공유합니다.

인쇄물이나 슬라이드에는 링크 대신 주소를 그대로 적습니다.

## 사이트 고유 브랜드

사이트 이름, 로고와 로고타입, 파비콘, 표지, OG 이미지, 고유한 화면 구성과 디자인은 에코익힘책을 식별하는 브랜드 자산입니다. MIT와 CC BY-NC-SA 4.0은 이 자산의 상표 사용이나 브랜드 사용을 허락하지 않습니다.

- 코드를 재사용해 별도의 사이트를 만드는 것은 가능합니다. 다만 에코익힘책의 이름, 로고, 표지, 화면 구성을 그대로 사용해 공식 사이트처럼 보이게 해서는 안 됩니다.
- 비상업적인 사용이라도 브랜드 자산은 허락 없이 복제하거나 재배포할 수 없습니다.
- 브랜드 자산 사용이 필요하면 [qus0in@gmail.com](mailto:qus0in@gmail.com)으로 문의해 주세요.

## 상업적 이용·2차 저작물 문의

다음에 해당하면 [qus0in@gmail.com](mailto:qus0in@gmail.com)으로 먼저 문의해 주세요.

- 교안 콘텐츠를 유료 강의, 교재, 구독 서비스에 사용하려는 경우
- 교안 콘텐츠를 번역하거나 다른 형태로 제작해 널리 배포하려는 경우
- 사이트 이름, 로고, 표지 같은 브랜드 자산을 사용하려는 경우
- 어느 라이선스가 적용되는지 판단하기 어려운 경우

문의에는 사용 목적, 사용할 자료와 범위, 배포 방식, 수익 발생 여부를 함께 적어 주시면 답변이 빨라집니다.

## 제3자 라이선스 및 고지

<!--@include: ./license-notices.md-->

## 제3자 권리에 대한 안내

제3자가 권리를 가진 자료에는 위의 MIT나 CC BY-NC-SA 4.0이 적용되지 않으며, 해당 자료는 원 제공자의 조건을 따릅니다. 이 페이지에 빠진 제3자 자료를 발견하셨거나 권리와 관련해 알려 주실 내용이 있다면 [qus0in@gmail.com](mailto:qus0in@gmail.com)으로 연락해 주세요.
