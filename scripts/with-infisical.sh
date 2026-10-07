#!/bin/bash
set -euo pipefail

# Wrapper to inject env vars from Infisical with sensible defaults.
# Usage: ./scripts/with-infisical.sh <command> [args...]

if [[ "${INFISICAL_SKIP:-}" == "1" || "${GITHUB_ACTIONS:-}" == "true" ]]; then
  exec "$@"
fi

ENVIRONMENT=${INFISICAL_ENV:-dev}
PROJECT_ID=${INFISICAL_PROJECT_ID:-fcf0d51b-b47a-4875-8f62-22fac5ea985d}
SECRET_PATH=${INFISICAL_PATH:-/}

if ! command -v infisical >/dev/null 2>&1; then
  echo "Infisical CLI not found; installing @infisical/cli globally..." >&2
  npm install -g @infisical/cli >/tmp/infisical-cli-install.log 2>&1 || {
    echo "Failed to install Infisical CLI. See /tmp/infisical-cli-install.log for details." >&2
    exit 127
  }
  export PATH="$(npm root -g)/.bin:${PATH}"
fi

# Unattended-safe login. The Infisical CLI's own login session expires after a
# few days, and the CLI then starts a browser login by itself. So:
#   1. When no token was passed and the local `fv-secret` helper is installed,
#      log in through it (a machine identity; credentials cached by op-fast).
#      The token is kept out of the wrapped command. INFISICAL_NO_FV_SECRET=1 skips it.
#   2. Without a token and without a terminal, refuse instead of letting the
#      CLI open a browser login. INFISICAL_ALLOW_GLOBAL_PROFILE=1 overrides
#      this when the session is known to be valid.
HELPER_TOKEN_USED=0
if [[ -z "${INFISICAL_TOKEN:-}" && "${INFISICAL_NO_FV_SECRET:-}" != "1" ]] &&
  command -v fv-secret >/dev/null 2>&1; then
  if HELPER_TOKEN="$(fv-secret --access-token 2>/dev/null)" && [[ -n "${HELPER_TOKEN}" ]]; then
    export INFISICAL_TOKEN="${HELPER_TOKEN}"
    HELPER_TOKEN_USED=1
  else
    echo "with-infisical: fv-secret could not log in; falling back to the Infisical CLI session." >&2
  fi
  unset HELPER_TOKEN
fi
if [[ -z "${INFISICAL_TOKEN:-}" && ! -t 0 && ! -t 2 && "${INFISICAL_ALLOW_GLOBAL_PROFILE:-}" != "1" ]]; then
  echo "with-infisical: no Infisical token and no terminal; refusing to use the CLI login session (an expired session would open a browser login). Check the helper with: fv-secret --projects. Or run this from a terminal, or set INFISICAL_ALLOW_GLOBAL_PROFILE=1." >&2
  exit 1
fi

# A person at a terminal (or an explicit override) let the CLI session through.
# Wrapped commands that call this wrapper again (turbo, concurrently, tmux
# panes) have no terminal of their own, so pass that permission down.
if [[ -z "${INFISICAL_TOKEN:-}" ]]; then
  export INFISICAL_ALLOW_GLOBAL_PROFILE=1
fi

CMD=(infisical run --env="${ENVIRONMENT}" --path="${SECRET_PATH}")
if [[ -n "${PROJECT_ID}" ]]; then
  CMD+=(--projectId="${PROJECT_ID}")
fi
if [[ "${HELPER_TOKEN_USED}" == "1" ]]; then
  # The helper's token belongs to this instance, whatever the global CLI profile points at.
  CMD+=(--domain="${INFISICAL_API_URL:-https://infisical.felixvemmer.com/api}")
  CMD+=(-- env -u INFISICAL_TOKEN "$@")
else
  CMD+=(-- "$@")
fi

exec "${CMD[@]}"
