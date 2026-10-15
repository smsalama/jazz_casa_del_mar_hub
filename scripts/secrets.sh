#!/usr/bin/env bash
# Secret scanning with a pinned, checksum-verified gitleaks.
# Usage: bash scripts/secrets.sh install | staged | all
set -u

GL_VERSION="8.28.0"
ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
TOOLS="$ROOT/.tools"
CONFIG="$ROOT/.gitleaks.toml"

platform() {
  case "$(uname -s)/$(uname -m)" in
    Darwin/arm64) echo "darwin_arm64" ;;
    Darwin/x86_64) echo "darwin_x64" ;;
    Linux/x86_64) echo "linux_x64" ;;
    Linux/aarch64 | Linux/arm64) echo "linux_arm64" ;;
    *) echo "unsupported" ;;
  esac
}

expected_sha() {
  case "$1" in
    darwin_arm64) echo "d942f3ad147250c9edbaab3fed9e482f98d3b59ba10ae97b8d75647e3ade492c" ;;
    darwin_x64) echo "edf5a507008b0d2ef4959575772772770586409c1f6f74dabf19cbe7ec341ced" ;;
    linux_x64) echo "a65b5253807a68ac0cafa4414031fd740aeb55f54fb7e55f386acb52e6a840eb" ;;
    linux_arm64) echo "eff65261156100e5d94a6b3dec313d532fddfe19ae1590bf7a2b4f2699128356" ;;
  esac
}

sha256_of() {
  if command -v shasum >/dev/null 2>&1; then shasum -a 256 "$1" | awk '{print $1}'
  else sha256sum "$1" | awk '{print $1}'; fi
}

install_gitleaks() {
  if [ -x "$TOOLS/gitleaks" ] && "$TOOLS/gitleaks" version 2>/dev/null | grep -q "$GL_VERSION"; then
    return 0
  fi
  plat=$(platform)
  if [ "$plat" = "unsupported" ]; then
    echo "gitleaks: unsupported platform $(uname -s)/$(uname -m)"; return 1
  fi
  mkdir -p "$TOOLS"
  tmp=$(mktemp -d)
  file="gitleaks_${GL_VERSION}_${plat}.tar.gz"
  url="https://github.com/gitleaks/gitleaks/releases/download/v${GL_VERSION}/${file}"
  echo "Downloading gitleaks ${GL_VERSION} for ${plat}"
  if ! curl -fsSL -o "$tmp/$file" "$url"; then
    echo "gitleaks: download failed from $url"; rm -rf "$tmp"; return 1
  fi
  actual=$(sha256_of "$tmp/$file")
  if [ "$actual" != "$(expected_sha "$plat")" ]; then
    echo "gitleaks: checksum mismatch, refusing to install"; rm -rf "$tmp"; return 1
  fi
  tar -xzf "$tmp/$file" -C "$tmp" gitleaks && mv "$tmp/gitleaks" "$TOOLS/gitleaks" && chmod +x "$TOOLS/gitleaks"
  rm -rf "$tmp"
  echo "gitleaks ${GL_VERSION} installed in .tools/"
}

GL="$TOOLS/gitleaks"
case "${1:-}" in
  install)
    install_gitleaks
    ;;
  staged)
    install_gitleaks >/dev/null || exit 1
    "$GL" git --pre-commit --staged --no-banner --redact -c "$CONFIG" "$ROOT"
    ;;
  all)
    install_gitleaks >/dev/null || exit 1
    "$GL" dir "$ROOT" --no-banner --redact -c "$CONFIG" || exit 1
    if git -C "$ROOT" rev-parse HEAD >/dev/null 2>&1; then
      "$GL" git "$ROOT" --no-banner --redact -c "$CONFIG" || exit 1
    fi
    ;;
  *)
    echo "Usage: bash scripts/secrets.sh install | staged | all"; exit 2
    ;;
esac
