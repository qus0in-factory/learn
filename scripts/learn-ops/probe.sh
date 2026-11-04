#!/bin/bash
# readback.sh가 source한다. 한 URL의 상태·Location·Cache-Control과 probe 목록 실행.
probe() { # label url [curl args...]
  local label=$1 url=$2 hdr st loc cc
  shift 2
  hdr=$(curl -sS -o /dev/null -D - "$@" "$url" 2>&1 | tr -d '\r')
  st=$(printf '%s\n' "$hdr" | head -1 | awk '{print $2}')
  loc=$(printf '%s\n' "$hdr" | awk -F': ' 'tolower($1)=="location"{print $2; exit}')
  cc=$(printf '%s\n' "$hdr" | awk -F': ' 'tolower($1)=="cache-control"{print $2; exit}')
  printf '%-34s %-4s loc=%s | cc=%s\n' "$label" "$st" "${loc:--}" "${cc:--}"
}

probes() { # file version js css
  local label path
  while IFS=$'\t' read -r label path; do
    [[ -z $label || $label == \#* ]] && continue
    path=${path//\$PDF_VERSION/$2}
    path=${path//\$ASSET_JS/$3}
    path=${path//\$ASSET_CSS/$4}
    if [[ $path == @files/* ]]; then
      probe "$label" "$FILES_BASE/${path#@files/}"
    else
      probe "$label" "$ECHO_BASE$path" $pin
    fi
  done < "$1"
}
