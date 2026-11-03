#!/bin/bash
# readback: 상태·Location·Cache-Control을 26개 probe로 기록한다.
# usage: readback.sh OUT [probes.tsv]
set -euo pipefail
dir=$(CDPATH= cd -- "$(dirname "$0")" && pwd)
root=$(CDPATH= cd -- "$dir/../.." && pwd)
source "$dir/config.env"
source "$dir/probe.sh"
out=${1:?out file}
host=${ECHO_BASE#*://}
version=$(sed -n 's/.*"version": "\([^"]*\)".*/\1/p' "$root/learn-site/.vitepress/pdf.json")
pin=${RESOLVE_IP:+--resolve $host:443:$RESOLVE_IP}
html=$(curl -sS $pin "$ECHO_BASE/")
js=$(printf %s "$html" | grep -oE '/assets/app\.[A-Za-z0-9_-]+\.js' | head -1)
css=$(printf %s "$html" | grep -oE '/assets/style\.[A-Za-z0-9_-]+\.css' | head -1)
{
  echo "# readback $(date '+%F %T %Z') js=$js css=$css"
  probes "${2:-$dir/probes.tsv}" "$version" "$js" "$css"
} | tee "$out"
