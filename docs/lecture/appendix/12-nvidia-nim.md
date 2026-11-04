---
subtitle: "OpenCode에서 NVIDIA NIM의 무료 OpenAI 호환 엔드포인트를 대체 모델로 연결한다."
tags: ["NVIDIA NIM", "OpenCode", "Nemotron", "API 키", "환경 변수", "무료 엔드포인트"]
---

# NVIDIA NIM 연결

관련 STEP: [STEP 01 버전 관리의 세 영역](../01-environment.md) · [환경 변수와 비밀 정보](11-environment-secrets.md) 부록

OpenCode의 기본 모델이 없거나 느릴 때 NVIDIA NIM의 무료 엔드포인트를 대체 모델로 붙일 수 있다. 이 부록은 build.nvidia.com에서 키를 받아 OpenCode V2의 사용자 정의 공급자로 연결하는 순서를 정리한다.

## 학습 목표

- NVIDIA NIM을 언제 대체 모델로 쓰는지 설명할 수 있다.
- build.nvidia.com에서 API 키를 발급할 수 있다.
- OpenCode V2의 `providers` 설정으로 NVIDIA 엔드포인트를 연결할 수 있다.
- 모델 ID와 무료 엔드포인트의 사용량·데이터 주의를 확인할 수 있다.

## 왜 필요한가

기본 모델의 사용량이 부족하거나 응답이 느릴 때 다른 공급자를 대체로 쓸 수 있다. NVIDIA NIM은 OpenAI 호환 API를 제공하므로 OpenCode의 OpenAI 호환 공급자로 연결할 수 있다. 다만 무료 엔드포인트는 속도·요청 한도가 있고 학습용 체험판 약관이 적용되므로, 상시 운영용이 아니라 필요할 때 쓰는 대체 수단으로 본다.

## NVIDIA NIM이란

NIM은 NVIDIA Inference Microservices의 줄임말이다. NVIDIA NIM은 NVIDIA가 호스팅하는 추론 엔드포인트다. build.nvidia.com의 모델 페이지에서 무료 API 엔드포인트를 제공하며, OpenAI 호환 경로는 `https://integrate.api.nvidia.com/v1`이다. 이 부록의 예시 모델은 `nvidia/nemotron-3.5-lightning-30b-a3b`다. [모델 페이지](https://build.nvidia.com/nvidia/nemotron-3.5-lightning-30b-a3b) 기준으로 컨텍스트 길이 1M, 전체 30B·활성 3B 파라미터, 텍스트 입력·출력 모델이며 무료 엔드포인트가 제공된다.

## 가입과 API 키

1. [build.nvidia.com](https://build.nvidia.com/explore/discover)에서 계정을 만든다.
2. 모델 페이지의 `Prototype` 영역에서 API 키를 발급한다. `Generate API Key` 또는 기존 키를 사용한다.
3. 가입·키 발급에는 휴대폰 인증이 필요하고 결제 카드는 필요 없다(사용자 확인). 공식 페이지에 이 절차가 직접 적혀 있지 않으므로 가입 화면의 안내를 따른다.
4. 키는 `NVIDIA_API_KEY` 환경 변수에 넣는다. 키 값을 코드·`opencode.jsonc`·Git 저장소에 적지 않는다. 자세한 관리 방법은 [환경 변수와 비밀 정보](11-environment-secrets.md) 부록을 참고한다.

```bash
export NVIDIA_API_KEY="발급받은_키"
```

Windows PowerShell에서는 `$env:NVIDIA_API_KEY = "발급받은_키"`를 쓴다.

OpenCode의 자격 증명 저장소를 쓰는 경우에는 그 저장소에 키를 두고, 이 부록의 사용자 정의 공급자처럼 환경 변수를 쓰는 경우에는 `NVIDIA_API_KEY`에 둔다. 어느 쪽이든 코드·`opencode.jsonc`·Git 저장소에는 값을 적지 않는다.

## OpenCode 연결

OpenCode V2는 `opencode.jsonc`의 `providers` 객체에 사용자 정의 공급자를 추가한다. 프로젝트 루트에 파일을 만들고 아래 설정을 넣는다. NVIDIA 페이지의 OpenCode 예시는 `provider`·`npm`·`options` 형식이지만, V2 문서의 사용자 정의 공급자 형식은 `providers`·`package`·`settings`이므로 V2 형식을 쓴다.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "providers": {
    "nvidia": {
      "name": "NVIDIA NIM",
      "env": ["NVIDIA_API_KEY"],
      "package": "@opencode/ai/providers/openai-compatible",
      "settings": {
        "baseURL": "https://integrate.api.nvidia.com/v1"
      },
      "models": {
        "nemotron-3.5-lightning-30b-a3b": {
          "name": "Nemotron 3.5 Lightning 30B A3B",
          "modelID": "nvidia/nemotron-3.5-lightning-30b-a3b"
        }
      }
    }
  }
}
```

- `package`는 OpenAI 호환 API를 쓰는 런타임이다.
- `env`는 키를 읽을 환경 변수 이름이다. 값은 파일에 쓰지 않는다.
- `settings.baseURL`은 NVIDIA의 OpenAI 호환 엔드포인트다.
- `models`의 키는 OpenCode에서 쓰는 모델 ID이고, `modelID`는 NVIDIA에 보내는 실제 모델 ID다.
- 전역 설정으로 쓰려면 `~/.config/opencode/opencode.jsonc`에 같은 `providers`를 둔다. 프로젝트 설정이 전역보다 우선한다.

설정을 저장한 뒤 OpenCode에서 `/models`를 실행하고 `nvidia/nemotron-3.5-lightning-30b-a3b`를 고른다. 목록에 보이지 않으면 OpenCode를 다시 시작하고, 키·`baseURL`·모델 ID를 확인한다. `/connect`는 카탈로그 공급자의 계정을 연결할 때 쓰는 명령이며, 이 사용자 정의 공급자는 위 설정과 환경 변수로 연결한다. 화면 구성은 [OpenCode V2 providers 문서](https://opencode.ai/v2/docs/providers)를 참고한다.

## 모델 선택

- `nvidia/nemotron-3.5-lightning-30b-a3b`는 빠른 에이전트 작업을 겨냥한 30B MoE 모델이다. 긴 문맥이 필요한 작업에 1M 컨텍스트를 제공한다.
- 모델을 기본값으로 두려면 `opencode.jsonc`의 최상위 `model`에 `nvidia/nemotron-3.5-lightning-30b-a3b`를 적는다. 필요할 때만 고르려면 `/models`에서 선택한다.
- 모델 ID는 NVIDIA 페이지와 OpenCode 설정의 `modelID`를 같은 값으로 맞춘다.

## 사용량과 데이터

- NVIDIA 모델 페이지 기준 무료 엔드포인트는 **최대 40 rpm·하루 10,000 요청**이다. 모델·트래픽에 따라 제한이 달라질 수 있고, 다른 사용자의 트래픽으로 느려질 수 있다. 상시 운영에는 전용 NIM 엔드포인트를 검토한다.
- 무료 체험은 [NVIDIA API Trial Terms of Service](https://assets.ngc.nvidia.com/products/api-catalog/legal/NVIDIA%20API%20Trial%20Terms%20of%20Service.pdf)가 적용된다. 모델 라이선스는 [OpenMDW 1.1](https://openmdw.ai/license/1-1/)이다.
- NVIDIA는 체험 제공과 제품·모델 개선을 위해 입력·출력을 기록할 수 있다. 비밀 정보·개인정보·회사 내부 자료를 입력하지 않는다. 자세한 내용은 [NVIDIA 개인정보 처리방침](https://www.nvidia.com/en-us/about-nvidia/privacy-policy/)을 참고한다.
- 무료 한도·약관·데이터 정책은 바뀔 수 있으므로 사용 전에 모델 페이지와 약관을 다시 확인한다.

## 체크리스트

- [ ] build.nvidia.com 계정을 만들고 휴대폰 인증을 마쳤다.
- [ ] API 키를 발급하고 `NVIDIA_API_KEY` 환경 변수에 넣었다.
- [ ] `opencode.jsonc`의 `providers.nvidia`에 `package`·`settings.baseURL`·`env`를 넣었다.
- [ ] `models`의 `modelID`가 `nvidia/nemotron-3.5-lightning-30b-a3b`인지 확인했다.
- [ ] OpenCode `/models`에서 모델을 선택하고 짧은 작업으로 응답을 확인했다.
- [ ] 키를 코드·설정 파일·저장소에 남기지 않았다.

## 주의할 점

- API 키를 `opencode.jsonc`에 직접 적지 않는다. `env`로 환경 변수 이름만 연결한다.
- 무료 엔드포인트는 학습·체험용이다. 개인정보·비밀정보·회사 내부 자료를 입력하지 않는다.
- 무료 한도(40 rpm·10,000/일)와 약관은 바뀔 수 있다. 오류가 나면 키·`baseURL`·모델 ID·네트워크를 먼저 확인한다.
- OpenCode V2와 NVIDIA 페이지의 설정 형식이 다르다. V2에서는 `providers`·`package`·`settings`를 쓰고, 화면·명령이 다르면 [OpenCode V2 문서](https://opencode.ai/v2/docs/providers)를 우선한다.
- 가입·키 발급 화면의 세부 단계는 공식 페이지에서 확인한다. 이 부록은 확인한 범위만 적었다.

## 핵심 내용 퀴즈 <QuizHelp />

1. NVIDIA NIM의 OpenAI 호환 엔드포인트 주소는 ::integrate.api.nvidia.com/v1::이다.
2. OpenCode V2의 사용자 정의 공급자 설정 키는 ::providers::이다.
3. API 키는 코드가 아니라 ::환경 변수::에 둔다.

## 참고 자료

- [NVIDIA NIM 모델 목록](https://build.nvidia.com/explore/discover)
- [Nemotron 3.5 Lightning 30B A3B 모델 페이지](https://build.nvidia.com/nvidia/nemotron-3.5-lightning-30b-a3b)
- [OpenCode V2 providers](https://opencode.ai/v2/docs/providers)
- [OpenCode V2 config](https://opencode.ai/v2/docs/config)
- [NVIDIA API Trial Terms of Service](https://assets.ngc.nvidia.com/products/api-catalog/legal/NVIDIA%20API%20Trial%20Terms%20of%20Service.pdf)
- [NVIDIA 개인정보 처리방침](https://www.nvidia.com/en-us/about-nvidia/privacy-policy/)
