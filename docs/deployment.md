# Cloudflare Worker 배포

## 경로

- `/`는 `/git/docs/`로 이동합니다.
- `/git/slides/`는 Slidev 빌드 결과를 제공합니다.
- `/git/docs/`는 VitePress 빌드 결과를 제공합니다.
- 경로 뒤 슬래시가 빠진 두 진입 경로는 슬래시를 붙여 이동합니다.

## 빌드와 배포

저장소 루트에서 각 프로젝트 빌드를 실행합니다.

```sh
pnpm --dir slides build
pnpm --dir course-site build
python3 scripts/build-landing.py
```

각 빌드는 `dist/git/slides`, `dist/git/docs`, `dist/git/index.html`에 결과물을 만듭니다. 세 결과와 `src/worker.js`가 준비된 뒤 저장소 루트에서 배포합니다. `/git/`은 문서와 슬라이드 링크를 제공하는 안내 페이지입니다.

```sh
pnpm --dir slides exec wrangler deploy --config ../wrangler.jsonc
```

기본 URL은 `https://hdai.qus0in.workers.dev`입니다. 배포 전 해당 이름의 Worker가 다른 서비스에 쓰이는지 확인하고, 배포는 커밋된 깨끗한 트리에서 진행합니다.
