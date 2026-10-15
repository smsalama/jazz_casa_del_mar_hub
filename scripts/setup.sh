#!/usr/bin/env bash
# One-time setup: checks prerequisites, installs dependencies, git hooks
# and the secret scanner. Safe to run again.
# Usage: bash scripts/setup.sh [--workspace]
set -u

ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT" || exit 2
MODE="${1:-}"

bash scripts/doctor.sh $MODE || { echo "Setup stopped: fix the items above, then run it again."; exit 1; }

chmod +x scripts/*.sh .githooks/* 2>/dev/null
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git config core.hooksPath .githooks
  echo "Git hooks enabled (dash check and secret scan on every commit)."
fi

if [ -f package-lock.json ]; then
  npm ci || exit 1
elif [ -f package.json ]; then
  npm install || exit 1
fi

if [ -f .env.example ] && [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example. Fill in any values it asks for."
fi

bash scripts/secrets.sh install || exit 1

echo ""
echo "Setup complete. Next: bash scripts/verify.sh"
if [ -f RUN-LOCALLY.md ]; then echo "Then follow RUN-LOCALLY.md to start it."; fi
