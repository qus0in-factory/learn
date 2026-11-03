#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/scripts/learn-pdf"
npm ci --no-audit --no-fund
node build.mjs
node test.mjs
python3 verify.py "$ROOT/dist/learn-pdfs"
