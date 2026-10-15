#!/usr/bin/env bash
# Every check in one command. The agents run it before every delivery;
# you can run it yourself to reproduce their results.
# Usage: bash scripts/verify.sh [--evidence DIR]
set -u

ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT" || exit 2

EVIDENCE=""
if [ "${1:-}" = "--evidence" ]; then EVIDENCE="${2:-}"; fi

REPO=$(basename "$ROOT")
SHA=$(git rev-parse --short HEAD 2>/dev/null || echo "nocommit")
TS=$(date -u +%Y%m%dT%H%M%SZ)
LOG=$(mktemp)
FAILS=0
SUMMARY=""

say() { echo "$*" | tee -a "$LOG"; }

step() {
  name="$1"; shift
  say ""
  say "== $name"
  "$@" 2>&1 | tee -a "$LOG"
  status=${PIPESTATUS[0]}
  if [ "$status" -eq 0 ]; then
    SUMMARY="${SUMMARY}PASS  ${name}
"
  else
    SUMMARY="${SUMMARY}FAIL  ${name}
"
    FAILS=$((FAILS + 1))
  fi
}

has_script() {
  node -e "const p=require('./package.json');process.exit(p.scripts&&p.scripts['$1']?0:1)" 2>/dev/null
}

say "Verify report"
say "Repo: $REPO"
say "Commit: $SHA"
say "Uncommitted changes: $(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')"
say "Time (UTC): $TS"
say "Node: $(node -v 2>/dev/null || echo missing)"
say "System: $(uname -s) $(uname -m)"

step "No em-dashes or en-dashes in files" node scripts/check-dashes.mjs --all
step "No dashes in commit messages" node scripts/check-dashes.mjs --commits
step "No secrets in files or git history" bash scripts/secrets.sh all

if [ -f scripts/validate-gates.mjs ]; then
  step "Project state and gate records valid" node scripts/validate-gates.mjs
fi

if [ -f package.json ]; then
  if [ ! -d node_modules ]; then
    step "Dependencies installed" sh -c 'echo "node_modules missing: run bash scripts/setup.sh first"; exit 1'
  else
    for s in lint typecheck test test:contract test:e2e build; do
      if has_script "$s"; then step "npm run $s" npm run -s "$s"; fi
    done
  fi
fi

say ""
say "== Summary"
printf "%s" "$SUMMARY" | tee -a "$LOG"
if [ "$FAILS" -eq 0 ]; then say "RESULT: PASS"; else say "RESULT: FAIL ($FAILS failed)"; fi

if [ -n "$EVIDENCE" ]; then
  mkdir -p "$EVIDENCE"
  OUT="$EVIDENCE/verify-$REPO-$SHA-$TS.log"
  cp "$LOG" "$OUT"
  echo "Evidence saved: $OUT"
fi
rm -f "$LOG"

[ "$FAILS" -eq 0 ]
