---
subtitle: "눈누·Bulma·Coolors·favicon 도구로 폰트·스타일·색상·파비콘을 고른다."
tags: ["눈누", "Bulma", "Coolors", "favicon", "폰트", "색상"]
---

# 웹 디자인 보조 도구

관련 STEP: [STEP 06 웹사이트 배포](../06-pages.md) · [STEP 07 마크다운과 다이어그램](../07-markdown-mermaid.md)

눈누, Bulma, Coolors, favicon 도구는 핵심 Git 흐름이 아닌 선택 참고 도구이다. 포트폴리오의 글꼴, 버튼, 색상, 탭 아이콘을 다듬고 싶을 때 시간이 남으면 하나만 골라 적용한다. 도구를 모두 설치하거나 한 번에 바꾸지 않는다.

## 왜 필요한가

Git과 배포를 익히는 것이 먼저이다. 다만 같은 HTML/CSS라도 글꼴과 색상, 여백이 정리되면 결과물을 읽기 쉬워진다. 보조 도구는 이때 작은 변경을 돕는 역할이다. 도구마다 라이선스와 적용 범위가 다르므로, 디자인을 바꾸기 전에 출처와 사용 조건을 확인한다.

## 핵심 개념

파비콘(favicon)은 브라우저 탭과 즐겨찾기에 나오는 작은 아이콘이다.

| 도구 | 쓰는 곳 | 확인할 점 |
| --- | --- | --- |
| 눈누 | 무료·오픈 웹폰트 모음 | 폰트마다 상업적 이용 가능 범위와 허용 조건이 다름. 개별 폰트의 라이선스를 먼저 확인 |
| Bulma | 클래스 이름으로 버튼, 카드, 레이아웃을 만드는 경량 CSS 프레임워크 | 공식 문서의 설치 방법과 라이선스 확인. 필요한 클래스만 사용 |
| Coolors | 조화로운 색상 조합을 추천하는 팔레트 도구 | 색상 코드를 그대로 쓰기 전에 명암 대비와 접근성 확인 |
| favicon.io | 텍스트·이모지·이미지로 파비콘을 만드는 생성기 | 만든 파일을 내려받아 `index.html`의 `<head>`에 연결. 이모지·이미지의 사용 조건 확인 |
| RealFaviconGenerator | 여러 기기와 브라우저에 맞는 파비콘 세트와 HTML 코드를 만드는 도구 | 만들어 준 HTML 코드를 `<head>`에 넣고 파일 경로 확인. 원본 이미지의 사용 권한 확인 |

- 눈누: [noonnu.cc](https://noonnu.cc/)
- Bulma: [bulma.io](https://bulma.io/)
- Coolors: [coolors.co](https://coolors.co/)
- favicon.io: [favicon.io](https://favicon.io/)
- RealFaviconGenerator: [realfavicongenerator.net](https://realfavicongenerator.net/)

## 따라하기

1. 핵심 실습을 먼저 완료한다.
2. 도구 하나만 선택해 적용한다.
3. 라이선스와 출처를 확인한다.
4. 작은 변경으로 커밋하고 Pages에서 확인한다.

## 적용 예시

색상은 `style.css`의 변수로 모아 두면 나중에 바꾸기 쉽다.

```css
:root {
  --page-bg: #f7f7f7;
  --page-text: #222222;
  --card-bg: #ffffff;
}

body {
  background: var(--page-bg);
  color: var(--page-text);
}

main {
  background: var(--card-bg);
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem;
}
```

Bulma는 필요한 클래스만 붙여 본다. 설치와 최신 사용법은 공식 문서를 따른다.

```html
<a class="button is-primary" href="index.html">홈으로</a>
```

폰트는 눈누에서 고른 폰트의 라이선스를 확인한 뒤 `font-family`에 적용한다. 기본 글꼴을 함께 적어 두면 웹폰트가 로드되지 않아도 읽을 수 있다.

```css
body {
  font-family: "적용할 폰트", sans-serif;
}
```

파비콘은 favicon.io에서 텍스트나 이모지를 입력해 만든 뒤 내려받은 파일을 `index.html`과 같은 폴더에 둔다. RealFaviconGenerator에서는 원본 이미지를 올려 기기별 설정을 확인한 뒤 만들어 준 파일과 HTML 코드를 적용한다.

`<head>`에 파비콘을 연결하는 코드 예시

```html
<link rel="icon" href="favicon.ico" sizes="any">
```

## 체크리스트

- [ ] 선택한 도구의 라이선스와 출처를 확인했다.
- [ ] 한 번에 하나의 도구만 적용했다.
- [ ] 브라우저에서 글자와 버튼이 읽기 쉽다.
- [ ] 파비콘을 적용했다면 탭 아이콘이 보이고 Pages 주소에서도 같은 아이콘이 보인다.
- [ ] `git diff`로 변경 범위를 확인했다.
- [ ] 커밋과 push 후 Pages 주소에서도 같은 결과가 보인다.

## 주의

- 눈누 폰트를 모두 같은 라이선스로 가정하지 않는다. 폰트별로 확인한다.
- Bulma를 쓰지 않아도 괜찮다. 필요한 경우에만 최소 클래스를 적용한다.
- Coolors 색상은 예쁜 것만 고르지 말고 글자 대비를 확인한다.
- 파비콘은 브라우저가 저장해 두므로 바꿔도 탭 아이콘이 바로 달라지지 않을 수 있다. 강력 새로고침으로 확인한다.
- 파비콘 생성기에는 개인정보가 담긴 이미지를 올리지 않고, 이미지·이모지의 사용 조건을 확인한다.
- 외부 폰트나 라이브러리가 많아지면 페이지가 느려질 수 있다.
- 비밀번호, 토큰, 개인정보를 예시 코드나 스크린샷에 넣지 않는다.
