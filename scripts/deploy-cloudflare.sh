#!/bin/bash
set -e

# Script to deploy to Cloudflare Workers
# Usage: ./scripts/deploy-cloudflare.sh [prod|preview]

ENV=${1:-prod}

if [ "$ENV" = "prod" ]; then
    ENV_FLAG=""
    echo "🚀 Deploying to PRODUCTION"
elif [ "$ENV" = "preview" ]; then
    ENV_FLAG="--env preview"
    echo "🔍 Deploying to PREVIEW"
else
    echo "❌ Invalid environment. Use 'prod' or 'preview'"
    exit 1
fi

echo ""
echo "📦 Building application with OpenNext..."
npx opennextjs-cloudflare build

echo ""
echo "🚀 Deploying to Cloudflare Workers..."
npx wrangler deploy --keep-vars $ENV_FLAG

echo ""
echo "✅ Deployment complete!"
echo ""
echo "💡 Your app is now live on Cloudflare Workers"