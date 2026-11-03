#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
DEST="$1"
bash scripts/build-learn-pdfs.sh
python3 scripts/learn-pdf/repro.py dist/learn-pdfs
rm -rf "$DEST"
mkdir -p "$DEST"
cp -a dist/learn-pdfs/. "$DEST/"
