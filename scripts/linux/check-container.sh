#!/usr/bin/env bash
set -euo pipefail
mkdir -p /work
tar -x -C /work
find /work/docs/lecture /work/scripts/learn-pdf \( -name '._*' -o -name .DS_Store \) -delete
cd /work/scripts/learn-pdf
node -e "const p=require('./package-lock.json');if(p.packages['node_modules/playwright'].version!=='1.56.1')throw Error('playwright version drift')"
npm ci --no-audit --no-fund
node build.mjs
node test.mjs
python3 verify.py /work/dist/learn-pdfs
python3 repro.py /work/dist/learn-pdfs
mkdir -p /out
cp -a /work/dist/learn-pdfs/. /out/
chown -R "${HOST_UID:-0}:${HOST_GID:-0}" /out
