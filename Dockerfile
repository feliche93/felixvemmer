FROM oven/bun:1.3.10-alpine AS base
WORKDIR /app

RUN apk add --no-cache bash curl libc6-compat nodejs npm \
  && npm install -g @infisical/cli

FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app

ARG INFISICAL_MACHINE_CLIENT_ID
ARG INFISICAL_MACHINE_CLIENT_SECRET
ARG INFISICAL_PROJECT_ID
ARG INFISICAL_SECRET_ENV
ARG INFISICAL_API_URL
ARG INFISICAL_DOMAIN
ARG INFISICAL_SECRET_PATH=/

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN chmod +x ./scripts/with-infisical.sh ./entrypoint.sh

RUN set -eu; \
  if [ -n "${INFISICAL_DOMAIN:-}" ]; then INFISICAL_DOMAIN_FLAG="--domain=${INFISICAL_DOMAIN}"; \
  elif [ -n "${INFISICAL_API_URL:-}" ]; then INFISICAL_DOMAIN_FLAG="--domain=${INFISICAL_API_URL}"; else INFISICAL_DOMAIN_FLAG=""; fi; \
  export INFISICAL_TOKEN="$(infisical login ${INFISICAL_DOMAIN_FLAG} --method=universal-auth \
    --client-id="${INFISICAL_MACHINE_CLIENT_ID}" \
    --client-secret="${INFISICAL_MACHINE_CLIENT_SECRET}" \
    --silent \
    --plain)"; \
  export INFISICAL_ENV="${INFISICAL_SECRET_ENV:-staging}"; \
  export INFISICAL_PATH="${INFISICAL_SECRET_PATH:-/}"; \
  export INFISICAL_PROJECT_ID="${INFISICAL_PROJECT_ID}"; \
  INFISICAL_TOKEN="$INFISICAL_TOKEN" infisical run --projectId="${INFISICAL_PROJECT_ID}" --env="$INFISICAL_ENV" --path="$INFISICAL_PATH" -- sh -c 'INFISICAL_SKIP=1 bun run migrate && INFISICAL_SKIP=1 bun run build'

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

USER nextjs

EXPOSE 3000

CMD ["./entrypoint.sh"]
