# Git과 웹 배포 수업

## Workers 접속 경로

- PPT: 배포 전
- 정적 사이트: 배포 전

## 프로젝트 구조

```mermaid
flowchart LR
    Source[docs/261102/source] -->|동기화| Slides[slides · Slidev]
    Source -->|동기화| Site[course-site · VitePress]
    Source -->|동기화| Example[example-site · 실습 예제]
    Slides --> PPT[PPT Worker]
    Site --> Web[정적 사이트 Worker]
    Example --> Pages[학습자 GitHub Pages]
```
