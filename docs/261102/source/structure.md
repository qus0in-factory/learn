# 자료 원본과 전달 대상

수업 내용은 아직 작성하지 않았다. 각 원본을 편집한 뒤 `python3 scripts/sync-course.py`로 대응 파일에 반영한다.

| 원본 | 대상 | 용도 |
| --- | --- | --- |
| `slides/slides.md` | `slides/slides.md` | Slidev 발표 자료 |
| `course-site/index.md` | `course-site/index.md` | VitePress 안내 페이지 |
| `example-site/index.html` | `example-site/index.html` | 실습 웹 시작 파일 |
| `example-site/style.css` | `example-site/style.css` | 실습 웹 스타일 |

명령은 프로젝트 루트에서 실행한다. 대상에 다른 내용이 있으면 아무 파일도 변경하지 않고 중단한다. 차이를 확인하고 덮어써도 될 때만 `python3 scripts/sync-course.py --force`를 사용한다. 이 스크립트는 명시된 파일만 복사하며 원본이나 다른 파일은 삭제하지 않는다.
