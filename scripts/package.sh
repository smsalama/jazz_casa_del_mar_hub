#!/usr/bin/env bash
# Builds the runnable package. Re-runs verify in every repo first.
# Usage (from the hub, with web and api cloned next to it):
#   bash scripts/package.sh --preview <version>   for Steven to test before T3; no approval needed
#   bash scripts/package.sh <version>             the release; refuses without Steven's recorded T3 approval
set -u

PREVIEW=0
if [ "${1:-}" = "--preview" ]; then PREVIEW=1; shift; fi
V="${1:-}"
if [ -z "$V" ]; then echo "Usage: bash scripts/package.sh [--preview] <version>"; exit 2; fi

HUB=$(cd "$(dirname "$0")/.." && pwd)
cd "$HUB" || exit 2
PARENT=$(dirname "$HUB")

if [ "$PREVIEW" -eq 0 ]; then
  APPROVAL="approvals/T3-release-$V.md"
  if [ ! -f "$APPROVAL" ] || ! grep -q '^Approved by: Steven' "$APPROVAL" || ! grep -q '^> ' "$APPROVAL"; then
    echo "Refusing to package: $APPROVAL is missing, or has no quoted approval from Steven."
    echo "To build a package for testing before approval, use: bash scripts/package.sh --preview $V"
    exit 1
  fi
fi

PROJECT=$(node -e "const s=require('./state/project.json');console.log(s.client+'-'+s.project)") || exit 1
REPOS=$(node -e "const s=require('./state/project.json');for (const k of ['api','web']) { const r=s.repos[k]; if (r && r.url) console.log(r.name) }") || exit 1
if [ "$PREVIEW" -eq 1 ]; then
  EV="evidence/preview-$V"
  V="$V-preview"
else
  EV="evidence/release-$V"
fi

echo "Verifying hub"
bash scripts/verify.sh --evidence "$EV" >/dev/null || { echo "Hub verify failed; see $EV"; exit 1; }

for r in $REPOS; do
  d="$PARENT/$r"
  if [ ! -d "$d/.git" ]; then echo "Missing clone: $d"; exit 1; fi
  if [ -n "$(git -C "$d" status --porcelain)" ]; then echo "$r has uncommitted changes"; exit 1; fi
  echo "Verifying $r"
  (cd "$d" && bash scripts/verify.sh --evidence "$HUB/$EV" >/dev/null) || { echo "$r verify failed; see $EV"; exit 1; }
done

OUT="dist/$PROJECT-$V"
rm -rf "$OUT"
mkdir -p "$OUT"

for r in $REPOS; do
  short=${r##*-}
  git -C "$PARENT/$r" archive --format=tar --prefix="$short/" HEAD | tar -x -C "$OUT"
done
git archive --format=tar --prefix="docs/" HEAD | tar -x -C "$OUT"

cat > "$OUT/setup.sh" <<'EOF'
#!/usr/bin/env bash
# Sets up every part of this package. Run once.
set -u
cd "$(dirname "$0")" || exit 2
for d in api web; do
  [ -d "$d" ] || continue
  echo "== Setting up $d"
  (cd "$d" && bash scripts/setup.sh) || { echo "Setup failed in $d"; exit 1; }
done
echo "Setup complete. Next: bash verify.sh"
EOF

cat > "$OUT/verify.sh" <<'EOF'
#!/usr/bin/env bash
# Runs every check in every part of this package.
set -u
cd "$(dirname "$0")" || exit 2
FAILS=0
for d in api web; do
  [ -d "$d" ] || continue
  echo "== Verifying $d"
  (cd "$d" && bash scripts/verify.sh) || FAILS=$((FAILS + 1))
done
if [ "$FAILS" -eq 0 ]; then echo "ALL PARTS PASS"; else echo "$FAILS part(s) failed"; exit 1; fi
EOF
chmod +x "$OUT/setup.sh" "$OUT/verify.sh"

sed -e "s/PROJECT_NAME/$PROJECT/g" -e "s/PACKAGE_VERSION/$V/g" -e "s#EVIDENCE_DIR#$EV#g" release/RUN-LOCALLY.template.md > "$OUT/RUN-LOCALLY.md"
if [ "$PREVIEW" -eq 1 ]; then
  { echo "**PREVIEW for testing before release approval. Not for handover to the client.**"; echo ""; cat "$OUT/RUN-LOCALLY.md"; } > "$OUT/RUN-LOCALLY.tmp" && mv "$OUT/RUN-LOCALLY.tmp" "$OUT/RUN-LOCALLY.md"
fi

(cd dist && rm -f "$PROJECT-$V.zip" && zip -qr "$PROJECT-$V.zip" "$PROJECT-$V") || exit 1
echo "Package: $HUB/dist/$PROJECT-$V.zip"
