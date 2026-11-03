#!/usr/bin/env bash
set -euo pipefail
cd scripts/learn-pdf
npm ci --no-audit --no-fund
npx playwright install --with-deps chromium
cd ../..
bash scripts/build-learn-pdfs.sh
node scripts/learn-pdf/font-test.mjs
python3 scripts/learn-pdf/repro.py dist/learn-pdfs
