#!/usr/bin/env bash
set -euo pipefail
npm ci --prefix scripts/learn-pdf --no-audit --no-fund
node scripts/learn-pdf-ops/bootstrap-browser.mjs
bash scripts/learn-pdf/ci.sh
