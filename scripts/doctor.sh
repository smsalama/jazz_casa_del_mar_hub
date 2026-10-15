#!/usr/bin/env bash
# Checks that this machine has what the project needs. Changes nothing.
# Usage: bash scripts/doctor.sh [--workspace]
# --workspace: running in the agency's cloud workspace, where Docker is not available.
set -u

ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT" || exit 2
WORKSPACE=0
if [ "${1:-}" = "--workspace" ]; then WORKSPACE=1; fi
MISSING=0

ok() { printf "  OK       %s\n" "$1"; }
bad() { printf "  MISSING  %s\n           %s\n" "$1" "$2"; MISSING=$((MISSING + 1)); }
note() { printf "  NOTE     %s\n" "$1"; }

echo "Checking prerequisites for $(basename "$ROOT")"

if command -v git >/dev/null 2>&1; then ok "git $(git --version | awk '{print $3}')"
else bad "git" "Install the Xcode command line tools: xcode-select --install"; fi

if command -v node >/dev/null 2>&1; then
  have=$(node -v | sed 's/^v//' | cut -d. -f1)
  if [ -f .nvmrc ]; then
    want=$(tr -d 'v \n' < .nvmrc | cut -d. -f1)
    if [ "$have" = "$want" ]; then ok "Node $(node -v)"
    else bad "Node $want (found $(node -v))" "Install Node $want from https://nodejs.org or with nvm: nvm install $want"; fi
  else
    ok "Node $(node -v)"
  fi
else
  bad "Node.js" "Install the LTS version from https://nodejs.org"
fi

if command -v npm >/dev/null 2>&1; then ok "npm $(npm -v)"
else bad "npm" "Comes with Node.js from https://nodejs.org"; fi

if command -v curl >/dev/null 2>&1; then ok "curl"
else bad "curl" "Needed to download the secret scanner"; fi

if [ -f docker-compose.yml ] || [ -f compose.yaml ]; then
  if [ "$WORKSPACE" -eq 1 ]; then
    note "Docker not used in the cloud workspace; tests use an embedded database there"
  elif command -v docker >/dev/null 2>&1; then
    if docker info >/dev/null 2>&1; then ok "Docker (running)"
    else bad "Docker engine not running" "Open Docker Desktop and wait until it says it is running"; fi
  else
    bad "Docker" "Install Docker Desktop from https://www.docker.com/products/docker-desktop"
  fi
fi

if [ "$WORKSPACE" -eq 0 ] && command -v lsof >/dev/null 2>&1; then
  for port in 3000 4000 5432; do
    if lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
      note "Port $port is already in use; stop the other program or change the port in .env"
    fi
  done
fi

if [ "$MISSING" -eq 0 ]; then
  echo "All prerequisites present."
else
  echo "$MISSING missing. Install them, then run this again."
  exit 1
fi
