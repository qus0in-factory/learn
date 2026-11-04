---
subtitle: "OpenCode의 /connect로 NVIDIA NIM을 연결하고 /models에서 모델을 고른다."
tags: ["NVIDIA NIM", "OpenCode", "Nemotron", "API 키", "모델 선택", "무료 엔드포인트"]
---

# NVIDIA NIM 연결

관련 STEP: [STEP 01 버전 관리의 세 영역](../01-environment.md) · [환경 변수와 비밀 정보](11-environment-secrets.md) 부록

OpenCode에서 쓰던 모델의 사용량이 부족하거나 응답이 느릴 때 NVIDIA NIM의 무료 엔드포인트를 대체 모델로 붙일 수 있다. 이 부록은 build.nvidia.com에서 키를 받아 OpenCode의 `/connect`로 Nvidia를 연결하고, `/models`에서 모델을 고르는 순서를 정리한다.

## 학습 목표

- NVIDIA NIM을 대체 모델로 쓰는 상황을 설명할 수 있다.
- build.nvidia.com에서 API 키를 발급한다.
- OpenCode `/connect`에서 Nvidia를 선택하고 키를 입력해 연결할 수 있다.
- `/models`에서 Nemotron 모델을 골라 응답을 확인한다.
- 무료 엔드포인트의 사용량과 데이터 주의를 확인할 수 있다.

## 왜 필요한가

기본 모델만으로는 사용량이 부족하거나 응답이 느릴 수 있다. NVIDIA NIM은 OpenAI 호환 API를 제공하므로 OpenCode의 `/connect` 목록에서 연결할 수 있다. 다만 무료 엔드포인트는 속도·요청 한도가 있고 학습용 체험판 약관이 적용되므로, 상시 운영용이 아니라 필요할 때 쓰는 대체 수단으로 본다.

## NVIDIA NIM이란

NIM은 NVIDIA Inference Microservices의 줄임말이다. NVIDIA가 호스팅하는 추론 엔드포인트이며, build.nvidia.com의 모델 페이지에서 무료 API를 제공한다. OpenAI 호환 경로는 `https://integrate.api.nvidia.com/v1`이다. 이 부록의 예시 모델은 NVIDIA 모델 ID가 `nvidia/nemotron-3.5-lightning-30b-a3b`인 Nemotron 3.5 Lightning 30B A3B다. 모델 페이지 기준 30B A3B MoE 모델이며 텍스트 입력·출력을 다루고 무료 엔드포인트가 제공된다.

## 가입과 API 키

1. [build.nvidia.com](https://build.nvidia.com/explore/discover)에서 계정을 만든다. 가입과 키 발급에는 휴대폰 인증이 필요하고 결제 카드는 필요 없다.
2. 모델 페이지의 `Prototype` 영역에서 API 키를 발급한다. `Generate API Key`를 누르거나 기존 키를 쓴다.
3. 키는 OpenCode의 자격 증명 입력 화면에 넣는다. 채팅·코드·설정 파일·Git 저장소에는 남기지 않는다.

## OpenCode 연결

1. OpenCode에서 `/connect`를 입력한다.
2. 공급자 목록에서 `Nvidia`를 고른다.
3. API 키를 붙여 넣는다. OpenCode가 자격 증명으로 저장한다.
4. `/models`를 입력하고 목록에서 `Nvidia` 공급자의 `Nemotron 3.5 Lightning 30B A3B`를 고른다.
5. 짧은 질문을 보내 응답이 오는지 확인한다.

키를 따로 내보내거나 설정 파일에 공급자를 적을 필요가 없다. 연결과 모델 선택은 OpenCode 화면에서 끝낸다.

## 모델 선택

- `/models` 목록에는 공급자 이름과 모델 표시 이름이 나온다. `Nvidia` 공급자의 `Nemotron 3.5 Lightning 30B A3B`를 고르면 모델 ID를 직접 입력하지 않아도 된다.
- 고른 모델은 현재 세션에 적용된다. 설정 파일의 기본 모델은 바뀌지 않는다.
- 다른 NVIDIA 모델을 쓰려면 같은 목록에서 다른 모델을 고른다. 목록에 NVIDIA 모델이 없으면 `/connect`에서 Nvidia 연결을 확인한 뒤 `/models`를 다시 연다.
- 모델을 바꾼 뒤에는 짧은 질문으로 응답을 확인한다. 파일 읽기처럼 가벼운 작업부터 시험한다.

## 사용량과 데이터

- NVIDIA 모델 페이지 기준 무료 엔드포인트는 최대 40 rpm·하루 10,000 요청이다. 모델·트래픽에 따라 제한이 달라질 수 있고, 다른 사용자의 트래픽으로 느려질 수 있다. 상시 운영에는 전용 NIM 엔드포인트를 검토한다.
- 무료 체험은 [NVIDIA API Trial Terms of Service](https://assets.ngc.nvidia.com/products/api-catalog/legal/NVIDIA%20API%20Trial%20Terms%20of%20Service.pdf)가 적용된다. 모델 라이선스는 [OpenMDW 1.1](https://openmdw.ai/license/1-1/)이다.
- NVIDIA는 체험 제공과 제품·모델 개선을 위해 입력·출력을 기록할 수 있다. 비밀 정보·개인정보·회사 내부 자료를 입력하지 않는다. 자세한 내용은 [NVIDIA 개인정보 처리방침](https://www.nvidia.com/en-us/about-nvidia/privacy-policy/)을 참고한다.
- 무료 한도·약관·데이터 정책은 바뀔 수 있으므로 사용 전에 모델 페이지와 약관을 다시 확인한다.

## 체크리스트

- [ ] build.nvidia.com 계정을 만들고 API 키를 발급했다.
- [ ] OpenCode `/connect`에서 `Nvidia`를 골라 키를 입력했다.
- [ ] `/models`에서 `Nemotron 3.5 Lightning 30B A3B`를 골랐다.
- [ ] 짧은 질문으로 응답을 확인했다.
- [ ] 키를 채팅·코드·설정 파일·저장소에 남기지 않았다.

## 주의할 점

- API 키를 채팅·코드·설정 파일·Git 저장소에 적지 않는다. OpenCode의 자격 증명 화면에만 넣는다.
- 무료 엔드포인트는 학습·체험용이다. 개인정보·비밀정보·회사 내부 자료를 입력하지 않는다.
- 무료 한도(40 rpm·10,000/일)와 약관은 바뀔 수 있다. 오류가 나면 `/connect`의 Nvidia 연결과 `/models`의 모델 선택을 먼저 확인한다.
- 모델 목록과 표시 이름은 카탈로그가 갱신되면 달라질 수 있다. 목록에서 NVIDIA 모델을 찾아 고른다.

## 핵심 내용 퀴즈 <QuizHelp />

1. OpenCode에서 공급자 계정을 연결하는 명령은 ::/connect::이다.
2. 연결한 공급자의 모델을 고르는 명령은 ::/models::이다.
3. API 키는 코드나 설정 파일이 아니라 OpenCode의 ::자격 증명 입력 화면::에 넣는다.

## 참고 자료

- [NVIDIA NIM 모델 목록](https://build.nvidia.com/explore/discover)
- [Nemotron 3.5 Lightning 30B A3B 모델 페이지](https://build.nvidia.com/nvidia/nemotron-3.5-lightning-30b-a3b)
- [OpenCode V2 models](https://opencode.ai/v2/docs/models)
- [OpenCode V2 providers](https://opencode.ai/v2/docs/providers)
- [OpenCode V2 CLI providers](https://opencode.ai/v2/docs/cli/providers)
- [NVIDIA API Trial Terms of Service](https://assets.ngc.nvidia.com/products/api-catalog/legal/NVIDIA%20API%20Trial%20Terms%20of%20Service.pdf)
- [NVIDIA 개인정보 처리방침](https://www.nvidia.com/en-us/about-nvidia/privacy-policy/)
