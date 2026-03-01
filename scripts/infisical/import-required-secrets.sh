#!/bin/bash
set -euo pipefail

PROJECT_ID="${INFISICAL_PROJECT_ID:-fcf0d51b-b47a-4875-8f62-22fac5ea985d}"
SECRET_PATH="/"
ENVIRONMENT=""
ENV_FILE=""
DRY_RUN=0

usage() {
  cat <<'USAGE'
Usage:
  scripts/infisical/import-required-secrets.sh --env <dev|staging|prod> --file <env-file> [--path <path>] [--dry-run]

Examples:
  scripts/infisical/import-required-secrets.sh --env dev --file .env.local --dry-run
  scripts/infisical/import-required-secrets.sh --env staging --file .env.preview
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --env)
      ENVIRONMENT="${2:-}"
      shift 2
      ;;
    --file)
      ENV_FILE="${2:-}"
      shift 2
      ;;
    --path)
      SECRET_PATH="${2:-}"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "${ENVIRONMENT}" || -z "${ENV_FILE}" ]]; then
  echo "--env and --file are required." >&2
  usage
  exit 1
fi

case "${ENVIRONMENT}" in
  dev|staging|prod) ;;
  *)
    echo "Invalid --env: ${ENVIRONMENT}. Use dev|staging|prod." >&2
    exit 1
    ;;
esac

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Env file not found: ${ENV_FILE}" >&2
  exit 1
fi

if ! command -v infisical >/dev/null 2>&1; then
  echo "Infisical CLI is not installed." >&2
  exit 1
fi

required_keys=(
  BETTER_AUTH_SECRET
  CLERK_SECRET_KEY
  DATABASE_URL
  DIRECT_URL
  GITHUB_TOKEN
  GOOGLE_CLIENT_ID
  GOOGLE_CLIENT_SECRET
  LEMON_SQUEEZY_BACKLINKGPT_API_KEY
  NEXT_PUBLIC_BASE_URL
  NEXT_PUBLIC_POSTHOG_HOST
  NEXT_PUBLIC_POSTHOG_KEY
  NEXT_PUBLIC_URL
  PAPIERKRAM_API_URL
  PAPIERKRAM_TOKEN
  POSTHOG_PERSONAL_API_KEY
  POSTHOG_PROJECT_ID
  RESEND_API_KEY
  SCRAPING_ROBOT_API_KEY
  TRIGGER_API_KEY
)

tmp_file="$(mktemp)"
missing_keys=()
imported_keys=()

cleanup() {
  rm -f "${tmp_file}"
}
trap cleanup EXIT

for key in "${required_keys[@]}"; do
  if [[ "${key}" == "CLERK_SECRET_KEY" && "${ENVIRONMENT}" != "dev" ]]; then
    continue
  fi

  line="$(grep -E "^[[:space:]]*${key}=" "${ENV_FILE}" | tail -n 1 || true)"
  if [[ -z "${line}" ]]; then
    missing_keys+=("${key}")
    continue
  fi

  # Strip leading whitespace and normalize to KEY=VALUE form.
  normalized="$(echo "${line}" | sed -E 's/^[[:space:]]*//')"
  echo "${normalized}" >>"${tmp_file}"
  imported_keys+=("${key}")
done

if [[ ${#missing_keys[@]} -gt 0 ]]; then
  echo "Missing required keys in ${ENV_FILE} for env=${ENVIRONMENT}:" >&2
  printf '  - %s\n' "${missing_keys[@]}" >&2
  exit 1
fi

echo "Prepared ${#imported_keys[@]} keys for env=${ENVIRONMENT}, path=${SECRET_PATH}."
printf '  - %s\n' "${imported_keys[@]}"

if [[ "${DRY_RUN}" -eq 1 ]]; then
  echo "Dry-run mode: no secrets were written."
  exit 0
fi

infisical --silent secrets set \
  --env="${ENVIRONMENT}" \
  --projectId="${PROJECT_ID}" \
  --path="${SECRET_PATH}" \
  --file="${tmp_file}" >/dev/null

echo "Imported secrets to Infisical env=${ENVIRONMENT}, path=${SECRET_PATH}."
