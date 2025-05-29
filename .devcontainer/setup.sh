#!/bin/bash
set -e

echo "🚀 Setting up MITRE ACT development environment..."

# Install Node.js 22 using nvm (already available in default Codespaces image)
echo "📦 Installing Node.js 22..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 22
nvm use 22
nvm alias default 22

# Enable corepack for pnpm
echo "📦 Enabling pnpm via corepack..."
corepack enable
corepack prepare pnpm@latest --activate

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Rebuild native modules
echo "🔧 Rebuilding native modules..."
pnpm rebuild

# Create .env file if it doesn't exist and add the Nuxt UI Pro license if available
if [ ! -f .env ] && [ -n "$NUXT_UI_PRO_LICENSE" ]; then
    echo "🔑 Setting up Nuxt UI Pro license..."
    echo "NUXT_UI_PRO_LICENSE=$NUXT_UI_PRO_LICENSE" > .env
fi

echo "✅ Setup complete! Run 'pnpm dev' to start the development server."