# Cloudflare Worker 배포

## 경로

- `/`는 `/git/`로 302 이동합니다.
- `/git/slides/`는 Slidev 빌드 결과를 제공합니다.
- `/git/docs/`는 VitePress 빌드 결과를 제공합니다.
- 경로 뒤 슬래시가 빠진 두 진입 경로는 슬래시를 붙여 이동합니다.

## 빌드와 배포

저장소 루트에서 각 프로젝트 빌드를 실행합니다. 빌드 전 구 버전 잔여 디렉터리(`dist/git`)가 없도록 clean build를 권장하며, assets root는 `./dist/hdai`만 사용합니다.

```sh
pnpm --dir slides build
pnpm --dir course-site build
python3 scripts/build-landing.py
```

각 빌드는 `dist/hdai/git/slides`, `dist/hdai/git/docs`, `dist/hdai/git/index.html`에 결과물을 만듭니다. 세 결과와 `src/worker.js`가 준비된 뒤 저장소 루트에서 배포합니다. `/git/`은 문서와 슬라이드 링크를 제공하는 안내 페이지입니다.

```sh
pnpm --dir slides exec wrangler deploy --config ../wrangler.jsonc
```

기본 URL은 `https://hdai.qus0in.workers.dev`입니다. 배포 전 해당 이름의 Worker가 다른 서비스에 쓰이는지 확인하고, 배포는 커밋된 깨끗한 트리에서 진행합니다.

## Learn Worker 운영 배포

아래는 위 hdai 예시와 별개인 현행 `learn` Worker 운영 절차입니다. `learn-worker/wrangler.jsonc`와 `dist/learn`을 사용합니다. 빌드 해시는 `node_modules` 내용이 아니라 체크아웃 위치(메인 저장소 `hdg`까지의 상대 경로)에 의존합니다. `/tmp`에서 빌드하면 같은 커밋도 라이브와 다른 해시가 되므로 `/tmp` 빌드는 사용하지 않고, 메인 저장소와 같은 부모 아래 `.worktrees/`에서 빌드합니다.

워크트리에서는 `course-site/node_modules`를 메인 저장소의 같은 디렉터리에, `learn-site/node_modules`를 `../course-site/node_modules`에 링크합니다. 의존성이 바뀌면 워크트리에서 설치하지 말고 메인 `hdg`에서 먼저 `pnpm --dir course-site install --frozen-lockfile`을 실행합니다. `learn-site/.vitepress/updated.mjs`가 git을 호출하므로 빌드는 git 저장소에서만 됩니다(tarball·export 빌드는 실패).

```sh
ln -s /path/to/main/course-site/node_modules course-site/node_modules
ln -s ../course-site/node_modules learn-site/node_modules
VITE_ASSET_CDN_BASE_URL=https://files.qus0in.dev ./course-site/node_modules/.bin/vitepress build learn-site
```

배포 전 `dist/learn/assets/app.*.js`·`style.*.css` 이름이 라이브 해시와 같은지 확인합니다. 로컬 `wrangler dev`가 실패하면 오류의 `newest date supported by this server binary` 값을 확인합니다. 로컬 workerd가 설정의 `compatibility_date`보다 낮은 날짜까지만 지원해서 생기는 문제이므로, 그 지원 날짜를 `--compatibility-date`로 넘겨 실행합니다(값을 문서에 고정하지 않음). `ERR_IPC_CHANNEL_CLOSED`는 원인이 아니라 증상이었습니다.

```sh
npx wrangler dev --config learn-worker/wrangler.jsonc --compatibility-date <로컬 workerd 지원 날짜>
```

`--compatibility-date`로도 해결되지 않거나 wrangler 업그레이드가 필요하면 `npx wrangler deploy --dry-run --config learn-worker/wrangler.jsonc`로 설정·번들을 확인하고, 실제 배포 후 readback으로 검증합니다.

배포 전후에 같은 readback과 tail을 남겨 비교합니다.

```sh
# 배포 전: 한 터미널에서 tail을 켜 두고 다른 터미널에서 readback
npx wrangler tail learn --format json > tail-before.jsonl
scripts/learn-ops/readback.sh before.txt
# tail 중지 후 배포
VITE_ASSET_CDN_BASE_URL=https://files.qus0in.dev node scripts/static-assets/deploy.mjs
# 배포 후 같은 방식으로 tail-after.jsonl, after.txt 생성
diff before.txt after.txt
python3 scripts/learn-ops/tailsum.py tail-before.jsonl
python3 scripts/learn-ops/tailsum.py tail-after.jsonl
```

`readback.sh`는 `scripts/learn-ops/config.env`의 기본값을 쓰며 `ECHO_BASE`, `FILES_BASE`, `RESOLVE_IP` 환경 변수로 덮어쓸 수 있습니다. `RESOLVE_IP`는 CDN IP를 고정할 때만 지정하고, PDF 버전은 `learn-site/.vitepress/pdf.json`에서 읽습니다.
