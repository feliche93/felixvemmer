#!/bin/sh
set -eu

require_var() {
  name="$1"
  eval "value=\${$name:-}"
  if [ -z "$value" ]; then
    echo "Missing required environment variable: $name" >&2
    exit 1
  fi
}

require_var INFISICAL_MACHINE_CLIENT_ID
require_var INFISICAL_MACHINE_CLIENT_SECRET
require_var INFISICAL_PROJECT_ID
require_var INFISICAL_SECRET_ENV

INFISICAL_DOMAIN_FLAG=""
if [ -n "${INFISICAL_DOMAIN:-}" ]; then
  INFISICAL_DOMAIN_FLAG="--domain=${INFISICAL_DOMAIN}"
elif [ -n "${INFISICAL_API_URL:-}" ]; then
  INFISICAL_DOMAIN_FLAG="--domain=${INFISICAL_API_URL}"
fi

INFISICAL_TOKEN="$(
  infisical login ${INFISICAL_DOMAIN_FLAG} \
    --method=universal-auth \
    --client-id="${INFISICAL_MACHINE_CLIENT_ID}" \
    --client-secret="${INFISICAL_MACHINE_CLIENT_SECRET}" \
    --silent \
    --plain
)"
export INFISICAL_TOKEN

exec infisical run \
  --projectId="${INFISICAL_PROJECT_ID}" \
  --env="${INFISICAL_SECRET_ENV}" \
  --path="${INFISICAL_SECRET_PATH:-/}" \
  -- node server.js
