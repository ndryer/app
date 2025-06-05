#!/bin/bash

# Playwright E2E Test Setup Script
# This script installs and configures Playwright for the portfolio project

set -e  # Exit on any error

echo "🎭 Setting up Playwright E2E Testing Environment..."

# Check if we're in the frontend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the frontend directory."
    exit 1
fi

# Check if yarn is available
if ! command -v yarn &> /dev/null; then
    echo "❌ Error: yarn is not installed. Please install yarn first."
    exit 1
fi

echo "📦 Installing Playwright dependencies..."

# Install Playwright and related packages
yarn add -D @playwright/test @axe-core/playwright

echo "🌐 Installing Playwright browsers..."

# Install Playwright browsers
npx playwright install

# Install system dependencies for browsers (Linux/CI)
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "🐧 Installing system dependencies for Linux..."
    npx playwright install-deps
fi

echo "📁 Creating test directories..."

# Ensure test directories exist
mkdir -p test-results
mkdir -p playwright-report

echo "🧪 Validating Playwright installation..."

# Test that Playwright is working
if npx playwright --version > /dev/null 2>&1; then
    echo "✅ Playwright installation successful!"
    npx playwright --version
else
    echo "❌ Playwright installation failed!"
    exit 1
fi

echo "🔧 Setting up test environment..."

# Create .env.test file if it doesn't exist
if [ ! -f ".env.test" ]; then
    cat > .env.test << EOF
# Playwright Test Environment Variables
PLAYWRIGHT_BROWSERS_PATH=0
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=0
CI=false
EOF
    echo "📝 Created .env.test file"
fi

echo "🎯 Running a quick smoke test..."

# Run a simple test to verify everything works
if npx playwright test --list > /dev/null 2>&1; then
    echo "✅ Playwright configuration is valid!"
else
    echo "⚠️  Warning: Playwright configuration may have issues. Check playwright.config.ts"
fi

echo ""
echo "🎉 Playwright setup complete!"
echo ""
echo "Available commands:"
echo "  yarn test:e2e          - Run all E2E tests"
echo "  yarn test:e2e:ui       - Run tests with UI mode"
echo "  yarn test:e2e:debug    - Run tests in debug mode"
echo "  yarn test:e2e:headed   - Run tests in headed mode"
echo "  yarn smoke             - Run smoke tests only"
echo ""
echo "📊 Test reports will be available in:"
echo "  - playwright-report/   - HTML report"
echo "  - test-results/        - Screenshots and videos"
echo ""
