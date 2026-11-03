#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
IMAGE="$1"
DEST="$2"
docker build -t "$IMAGE" -f "$ROOT/scripts/linux/Dockerfile" "$ROOT/scripts/linux"
rm -rf "$DEST"
mkdir -p "$DEST"
DEST="$(cd "$DEST" && pwd)"
COPYFILE_DISABLE=1 tar --no-xattrs --no-mac-metadata -C "$ROOT" \
  --exclude .git --exclude node_modules --exclude dist \
  --exclude '._*' --exclude .DS_Store -cf - . |
  docker run --rm -i -e HOST_UID="$(id -u)" -e HOST_GID="$(id -g)" \
    -v "$DEST:/out" "$IMAGE" bash /usr/local/bin/check-container.sh
