#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

: "${CAPTURE_URL:?CAPTURE_URL must point at the running preview}"
: "${CAPTURE_DIR:?CAPTURE_DIR must identify the screenshot output directory}"

export CAPTURE_URL
export CAPTURE_DIR
export CAPTURE_READY_SELECTOR="${CAPTURE_READY_SELECTOR:-body[data-app-ready='true']}"
export CAPTURE_AUTO_START="${CAPTURE_AUTO_START:-false}"

/usr/bin/time -p mkdir -p "$CAPTURE_DIR"
/usr/bin/time -p node "${RUNTIME_DIR:?}/scripts/default-capture.mjs"
