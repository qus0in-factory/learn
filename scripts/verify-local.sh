#!/usr/bin/env bash
# echo 로컬 검증 — .github/workflows/ci.yml과 같은 단계를 로컬에서 순서대로 실행한다.
# 새 검사를 추가하지 않는다. 범위는 docs/ci.md가 단일 출처다.
# 사용: scripts/verify-local.sh            # 린트·테스트·빌드·사후 검증·D1 SQL 생성
#       scripts/verify-local.sh --quick    # 린트·빌드 전 테스트만(빌드 생략)
#       scripts/verify-local.sh --content  # 위 전체 + content-lint(docs/lecture)
set -euo pipefail

cd "$(dirname "$0")/.."

QUICK=0
CONTENT=0
for arg in "$@"; do
  case "$arg" in
    --quick) QUICK=1 ;;
    --content) CONTENT=1 ;;
    *) printf '사용법: %s [--quick] [--content]\n' "$0" >&2; exit 2 ;;
  esac
done

step() { printf '\n== %s\n' "$1"; }
fail() { printf 'FAIL  %s\n' "$1" >&2; exit 1; }

[ -d course-site/node_modules ] \
  || fail "course-site/node_modules 없음 — 메인에서 'pnpm --dir course-site install --frozen-lockfile' 후 다시 실행"
if [ ! -e learn-site/node_modules ]; then
  ln -s ../course-site/node_modules learn-site/node_modules
  echo "learn-site/node_modules → ../course-site/node_modules 연결"
fi

step "Markdown 린트"
NODE_PATH=course-site/node_modules node scripts/lint-markdown.cjs docs/lecture README.md

step "빌드 전 테스트"
node --test scripts/learn/*.test.mjs learn-worker/*.test.mjs

if [ "$QUICK" -eq 0 ]; then
  step "learn-site 빌드"
  pnpm --dir course-site exec vitepress build ../learn-site

  step "빌드 산출물 검증"
  node --test learn-site/*.test.mjs

  step "D1 SQL 생성(로컬 산출물만)"
  node scripts/sync-learn-d1.mjs
fi

if [ "$CONTENT" -eq 1 ]; then
  step "콘텐츠 린트"
  node scripts/content-lint.mjs docs/lecture
fi

printf '\nPASS  로컬 검증 완료%s\n' "$([ "$QUICK" -eq 1 ] && echo ' (--quick: 빌드 생략)')"
