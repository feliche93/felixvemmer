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

CMD=(infisical run --env="${ENVIRONMENT}" --path="${SECRET_PATH}")
if [[ -n "${PROJECT_ID}" ]]; then
  CMD+=(--projectId="${PROJECT_ID}")
fi
CMD+=(-- "$@")

exec "${CMD[@]}"
