#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

PROJECT_DIR="$(pwd)"
PORT="${PORT:-3000}"
DIST="$PROJECT_DIR/dist"
METADATA_DIR="${OPENCODE_WEB_DIR:-$PROJECT_DIR/.omgithub-runtime}"

/usr/bin/time -p mkdir -p "$METADATA_DIR"
/usr/bin/time -p rm -rf "$DIST"
/usr/bin/time -p mkdir -p "$DIST"
/usr/bin/time -p cp -R "$PROJECT_DIR/site/." "$DIST/"

/usr/bin/time -p node -e '
  const fs = require("node:fs");
  const path = require("node:path");
  const [metadataDir, project, directory] = process.argv.slice(1);
  fs.mkdirSync(metadataDir, { recursive: true });
  fs.writeFileSync(
    path.join(metadataDir, "deployment-output.json"),
    JSON.stringify({ project, directory }),
  );
  console.log(`[start] deployment output: ${directory}`);
' "$METADATA_DIR" "$PROJECT_DIR" "$DIST"

export PORT
export DIST
exec /usr/bin/time -p node "$PROJECT_DIR/scripts/server.mjs"
