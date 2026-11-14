---
name: echo-deploy
description: echo 사이트·Worker 배포, PDF 재생성·교체, R2 정적 자산 업로드, D1 원격 적용, Gist 게시 등 원격 쓰기를 요청받았을 때 사용. 승인 경계와 따라야 할 운영 문서를 안내한다.
---

# 원격 쓰기·배포

## 승인 경계
- Worker 배포, R2 업로드, D1 원격 적용, PDF 교체, Gist 게시, `main` 승격·태그·릴리스는 사용자가 이번 작업에서 명시한 것만 한다. 이전 승인을 다음 작업에 넓히지 않는다.
- 일반 사이트 배포는 PDF 재생성·D1 적용을 포함하지 않는다. 각각 따로 요청받는다.
- `.env.local`·Kakao 키·Cloudflare 토큰은 `--env-file`로 주입만 하고 복사·출력·커밋하지 않는다. CI에 키나 새 단계를 넣지 않는다.

## 따를 문서
| 작업 | 문서 |
|---|---|
| 정적 사이트·Worker 배포, 새 정적 자산 | [deployment.md](../../../docs/deployment.md) |
| PDF 고정·승인된 교체·readback | [pdf-release.md](../../../docs/setup/pdf-release.md) |
| D1 SQL 생성·원격 적용 | [d1-sync.md](../../../docs/setup/d1-sync.md) |
| 현재 고정 revision·배포 SHA 기록 | [운영 목차](../../../docs/operations/index.md) |

## 순서
1. `dev`가 깨끗하고 배포할 SHA의 CI가 성공했는지 확인한다(`gh run list --branch dev`).
2. `echo-verify` 스킬로 로컬 검증을 통과시킨다.
3. 문서의 dry-run → apply → readback(원격 크기·SHA·HTTP 응답) 순서를 지킨다. readback 없이 완료로 보고하지 않는다.
4. 배포 SHA·Worker version·검증 결과를 운영 목차 "현재 상태"에 갱신한다.
