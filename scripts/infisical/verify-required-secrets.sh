#!/bin/bash
set -euo pipefail

PROJECT_ID="${INFISICAL_PROJECT_ID:-fcf0d51b-b47a-4875-8f62-22fac5ea985d}"
SECRET_PATH="/"

usage() {
  cat <<'USAGE'
Usage:
  scripts/infisical/verify-required-secrets.sh [--path <path>]

Verifies required keys exist in dev, staging, and prod.
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --path)
      SECRET_PATH="${2:-}"
      shift 2
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

if ! command -v infisical >/dev/null 2>&1; then
  echo "Infisical CLI is not installed." >&2
  exit 1
fi

base_required_keys=(
  BETTER_AUTH_SECRET
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

status=0
for env_name in dev staging prod; do
  required_keys=("${base_required_keys[@]}")
  if [[ "${env_name}" == "dev" ]]; then
    required_keys+=(CLERK_SECRET_KEY)
  fi

  secrets_dotenv="$(
    infisical --silent secrets \
      --env="${env_name}" \
      --projectId="${PROJECT_ID}" \
      --path="${SECRET_PATH}" \
      --output=dotenv
  )"

  actual_keys="$(
    echo "${secrets_dotenv}" \
      | sed -E '/^[[:space:]]*#/d;/^[[:space:]]*$/d;s/^[[:space:]]*export[[:space:]]+//' \
      | sed -E 's/[[:space:]]*=.*$//' \
      | sort -u
  )"

  expected_keys="$(printf '%s\n' "${required_keys[@]}" | sort -u)"
  missing="$(comm -23 <(echo "${expected_keys}") <(echo "${actual_keys}"))"

  if [[ -n "${missing}" ]]; then
    status=1
    echo "Missing keys in env=${env_name}, path=${SECRET_PATH}:"
    echo "${missing}" | sed 's/^/  - /'
  else
    echo "All required keys present in env=${env_name}, path=${SECRET_PATH}."
  fi
done

exit "${status}"
