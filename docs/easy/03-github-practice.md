---
subtitle: "마크다운과 TIL 작성을 GitHub에서 실습한다."
---

# GitHub 실습

{{ easyNotice }}

출처: [STEP 07 마크다운과 다이어그램](/git/07-markdown-mermaid), [STEP 08 프로필과 작업 기록](/git/08-profile-records)

## 마크다운

GitHub README에 아래 문법을 쓸 수 있다. 더 자세한 내용은 [GitHub의 기본 작성 및 서식 문법](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)을 참고한다.

~~~markdown
# 제목
**굵게**와 *기울임*

- 순서 없는 목록
1. 순서 있는 목록

[링크 이름](https://example.com)
![이미지 설명](image.png)
`인라인 코드`
~~~

더 많은 문법과 실습은 [STEP 07](/git/07-markdown-mermaid)을 따른다.

## TIL 작성법

TIL은 오늘 배운 내용 중 다시 참고할 점을 짧게 남기는 기록이다. 명령어만 복사하기보다 언제 쓰고 무엇을 확인했는지 적으면 복습에 도움이 된다. 날짜나 주제별 파일에 배운 점과 직접 확인한 결과를 적는다.

- 해결하려던 질문과 배운 내용
- 실행한 명령 또는 참고 링크
- 확인 결과와 남은 질문

TIL은 그날 배운 내용을 짧게 남기는 기록이다. 아래는 렌더링한 예시다.

<Screenshot name="step08-til" alt="첫 커밋 만들기에 관한 오늘 배운 내용과 정리" />

## ChatGPT 플러그인

ChatGPT는 GitHub 계정을 연결(커넥터)해 저장소의 파일과 문서를 읽고 질문에 답하게 할 수 있다. 예전의 플러그인 방식이 아니라 연결 기능을 기준으로 설명한다. 요금제와 계정 종류에 따라 쓸 수 있는 기능이 다를 수 있다.

1. ChatGPT 설정에서 앱·커넥터 연결 항목을 찾아 GitHub를 선택한다.
2. GitHub 로그인 화면이 나오면 로그인하고, ChatGPT가 접근할 계정이나 저장소를 고른다.
3. 연결한 뒤 대화에서 "내 저장소의 README를 요약해 줘"처럼 요청한다.
4. 필요 없어지면 같은 설정 화면이나 GitHub 설정에서 연결을 해제한다.

화면과 메뉴 이름은 버전에 따라 다를 수 있다. 정확한 절차는 [OpenAI 도움말 센터](https://help.openai.com)에서 "ChatGPT 커넥터"를 검색해 확인한다. 비공개 저장소는 꼭 필요한 저장소만 연결하고, 비밀정보가 든 파일은 접근시키지 않는다.
