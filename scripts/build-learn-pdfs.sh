#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SITE_DIR="$ROOT/learn-site"
PDF_DIR="$ROOT/dist/learn-pdfs"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [[ ! -x "$CHROME" ]]; then
  CHROME="$(command -v google-chrome || command -v chromium || true)"
fi
if [[ -z "$CHROME" || ! -x "$CHROME" ]]; then
  echo "Chrome/Chromium executable not found" >&2
  exit 1
fi

cd "$SITE_DIR"
npm run build

mkdir -p "$PDF_DIR"
rm -f "$PDF_DIR"/*.pdf

for html in "$ROOT"/dist/learn/[0-9][0-9]-*.html; do
  base="$(basename "$html" .html)"
  out="$PDF_DIR/$base.pdf"
  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --no-pdf-header-footer \
    --virtual-time-budget=5000 \
    --print-to-pdf="$out" \
    "file://$html" >/dev/null 2>&1
  if [[ ! -s "$out" ]]; then
    echo "PDF generation failed: $out" >&2
    exit 1
  fi
  echo "generated $out"
done

echo "PDF count: $(find "$PDF_DIR" -maxdepth 1 -name '*.pdf' | wc -l)"
