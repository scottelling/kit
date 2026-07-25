#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

npm run check

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "Missing git remote: origin" >&2
  exit 1
fi

git push origin main

npx --yes vercel --prod --yes

curl --fail --silent --show-error "https://kit.scottelling.com/r/button.json" >/dev/null
echo "Shipped https://kit.scottelling.com"
