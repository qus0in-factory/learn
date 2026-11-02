# 하위 프로젝트 설정

| 경로 | 용도 | 실행 | 빌드 결과 및 Workers 배포 |
| --- | --- | --- | --- |
| `slides/` | Slidev 발표 자료 | `pnpm install`, `pnpm dev` | `pnpm build` → `dist/`; `pnpm dlx wrangler deploy --assets ./dist --name hdg-slides` |
| `example-site/` | 정적 웹 예제 | `index.html`을 브라우저에서 열기 | 별도 빌드·배포 없음 |
| `course-site/` | VitePress 수업 안내 | `pnpm install`, `pnpm dev` | `pnpm build` → `.vitepress/dist/`; `pnpm dlx wrangler deploy --assets ./.vitepress/dist --name hdg-course-site` |

슬라이드와 수업 안내는 Cloudflare Pages 대신 각각 Cloudflare Workers 정적 자산으로 배포한다. 표의 배포 명령은 각 프로젝트 디렉터리에서 실행하며 Cloudflare 인증이 필요하다. 슬라이드를 하위 URL 경로에서 제공할 때는 해당 경로에 맞는 Slidev `--base`가 필요하다.

예제는 `example-site`의 파일을 별도 저장소의 루트에 두어 공유한다. 강의 내용, 실제 저장소 주소 및 배포 주소는 아직 정해지지 않았다.
