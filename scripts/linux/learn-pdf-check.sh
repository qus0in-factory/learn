#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
OUT="$ROOT/dist/linux-check"
IMAGE="learn-pdf-linux:u24.04-node24.22.1-pw1.56.1"
docker info >/dev/null 2>&1 || { echo "docker unavailable: run 'orbctl start'" >&2; exit 1; }
mkdir -p "$OUT"
if [ "${LINUX_ONLY:-0}" = 1 ]; then
  test -f "$OUT/macos/manifest.json" || { echo "missing macOS baseline" >&2; exit 1; }
else
  bash scripts/linux/check-macos.sh "$OUT/macos"
fi
bash scripts/linux/check-linux.sh "$IMAGE" "$OUT/linux"
docker image inspect -f '{{.Id}}' "$IMAGE" > "$OUT/image.txt"
node scripts/linux/collect.mjs "$OUT/macos" "$OUT/macos-probe.json"
node scripts/linux/collect.mjs "$OUT/linux" "$OUT/linux-probe.json"
node scripts/linux/compare.mjs "$OUT/macos-probe.json" "$OUT/linux-probe.json" "$OUT/compare.json" || compare_rc=$?
node scripts/linux/report.mjs "$OUT/compare.json" "$OUT/compare.md"
exit "${compare_rc:-0}"
