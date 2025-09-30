#!/bin/bash
set -e

# Script to set Cloudflare Workers secrets from .env files
# Usage: ./scripts/set-cloudflare-secrets.sh [prod|preview]

ENV=${1:-prod}

if [ "$ENV" = "prod" ]; then
    ENV_FILE=".env.prod"
    ENV_FLAG=""
    echo "🚀 Setting secrets for PRODUCTION environment"
elif [ "$ENV" = "preview" ]; then
    ENV_FILE=".env.preview"
    ENV_FLAG="--env preview"
    echo "🔍 Setting secrets for PREVIEW environment"
else
    echo "❌ Invalid environment. Use 'prod' or 'preview'"
    exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Error: $ENV_FILE not found!"
    exit 1
fi

echo "📁 Reading all variables from $ENV_FILE"
echo ""

# Count total variables (excluding comments and VERCEL_*)
TOTAL_COUNT=0
while IFS='=' read -r key value; do
    # Skip empty lines and comments
    [[ -z "$key" || "$key" =~ ^[[:space:]]*# ]] && continue

    # Skip VERCEL_* variables (not needed on Cloudflare)
    [[ "$key" =~ ^VERCEL_ ]] && continue

    TOTAL_COUNT=$((TOTAL_COUNT + 1))
done < "$ENV_FILE"

echo "📊 Found $TOTAL_COUNT variables to set as secrets"
echo ""
echo "⚠️  This will set ALL variables as encrypted secrets in Cloudflare Workers"
echo "⚠️  VERCEL_* variables will be skipped (not needed on Cloudflare)"
echo ""
echo "Press Ctrl+C to cancel, or Enter to continue..."
read

# Process and set each variable
COUNT=0
while IFS='=' read -r key value; do
    # Skip empty lines and comments
    [[ -z "$key" || "$key" =~ ^[[:space:]]*# ]] && continue

    # Skip VERCEL_* variables
    [[ "$key" =~ ^VERCEL_ ]] && continue

    # Remove leading/trailing whitespace from key
    key=$(echo "$key" | xargs)

    # Remove quotes from value if present
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//')

    if [ -z "$value" ]; then
        echo "⚠️  Skipping $key (empty value)"
        continue
    fi

    COUNT=$((COUNT + 1))
    echo "[$COUNT/$TOTAL_COUNT] 🔐 Setting $key..."
    echo "$value" | npx wrangler secret put "$key" $ENV_FLAG
    echo "✅ $key set successfully"
    echo ""
done < "$ENV_FILE"

echo ""
echo "🎉 All $COUNT secrets have been set for $ENV environment!"
echo ""
echo "💡 Next steps:"
echo "   1. Deploy your app: pnpm deploy"
echo "   2. The --keep-vars flag will preserve these secrets"
echo ""
echo "📝 Note: You can later configure which variables are build-time vs runtime"
echo "   in the Cloudflare dashboard under Workers & Pages settings"