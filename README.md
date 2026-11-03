# qus0in-factory/learn

## 아키텍처

```mermaid
flowchart LR
    Source[docs/261103 원문] -->|구조화| Lecture[docs/lecture 21개 Markdown]
    Lecture --> Site[VitePress learn site]
    Lecture --> Pdfs[12개 PDF]
    Site --> Learn[learn.qus0in.dev]
    Pdfs --> Files[files.qus0in.dev/v0.1.0]
    Repo[GitHub qus0in-factory/learn] --> Wiki[GitHub Wiki]
    Current[hdai.qus0in.workers.dev] -->|기존 서비스| Slides[slides / docs]
```

## 연결 주소

- 저장소: https://github.com/qus0in-factory/learn
- 강의 목차: https://github.com/qus0in-factory/learn/blob/main/docs/lecture/index.md
- Wiki: https://github.com/qus0in-factory/learn/wiki
- Issue #1: https://github.com/qus0in-factory/learn/issues/1
- Issue #3: https://github.com/qus0in-factory/learn/issues/3
- PR #2: https://github.com/qus0in-factory/learn/pull/2
- 현재 서비스: https://hdai.qus0in.workers.dev/git/
- 강의 사이트: https://learn.qus0in.dev
- 파일 제공: https://files.qus0in.dev/v0.1.0/
- 12주제 PDF: https://files.qus0in.dev/v0.1.0/01-environment.pdf
- 기존 슬라이드: 게시하지 않음
- v0.1.0: 배포 asset prefix, tag/release 미생성
