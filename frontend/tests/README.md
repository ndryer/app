# Simplified Playwright E2E Test Suite

This directory contains a streamlined end-to-end test suite for the Nathan Dryer Portfolio website, focusing on essential functionality rather than detailed implementation testing.

## Philosophy

This test suite follows a **user-focused approach** for a personal portfolio website:
- Tests core user journeys and functionality
- Ensures accessibility and responsive design
- Validates performance and reliability
- Avoids over-engineering with pixel-perfect layout testing

## Setup

### Prerequisites
- Node.js 16+
- Yarn package manager
- React development server running on localhost:3000

### Installation
```bash
# Run the setup script
./scripts/setup-playwright.sh

# Or install manually
yarn add -D @playwright/test @axe-core/playwright
npx playwright install
```

## Test Structure

### Test Files (4 core test suites)
- `core-functionality.spec.ts` - Essential site functionality (navigation, timeline, command menu)
- `accessibility.spec.ts` - WCAG compliance and accessibility features
- `responsive-design.spec.ts` - Mobile and desktop layout validation
- `performance.spec.ts` - Loading times and performance metrics

### Utilities
- `utils/test-helpers.ts` - Common test utilities and helpers

## Running Tests

### Basic Commands
```bash
# Run all tests (recommended)
yarn test:e2e

# Run with UI mode (interactive)
yarn test:e2e:ui

# Run in debug mode
yarn test:e2e:debug

# Run in headed mode (see browser)
yarn test:e2e:headed
```

### Individual Test Suites
```bash
# Run core functionality tests
yarn test:core

# Run accessibility tests
yarn test:a11y

# Run responsive design tests
yarn test:responsive

# Run performance tests
yarn test:performance
```

### Advanced Options
```bash
# Run tests on specific viewport
npx playwright test --project="Mobile"
npx playwright test --project="Desktop"

# Generate test report
npx playwright show-report

# Run with specific timeout
npx playwright test --timeout=60000
```

## Test Configuration

### Viewports (Simplified)
- **Mobile**: 375x667 (iPhone 13)
- **Desktop**: 1440x900 (Desktop Chrome)

### Test Strategy
- **Focus**: User-facing functionality over implementation details
- **Coverage**: Essential features for portfolio visitors
- **Reliability**: Robust selectors and error handling
- **Performance**: Fast execution with minimal flakiness

### Retry Strategy
- **Local Development**: 1 retry
- **CI Environment**: 2 retries
- **Timeout**: 60 seconds per test
- **Action Timeout**: 10 seconds

### Artifacts
- **Screenshots**: Captured on failure for debugging
- **Videos**: Retained on failure
- **Traces**: Captured on first retry
- **Reports**: HTML report in `playwright-report/`

## Common Issues and Solutions

### 1. "Cannot find package '@playwright/test'"
```bash
yarn add -D @playwright/test
npx playwright install
```

### 2. "Development server not running"
```bash
# Start the dev server first
yarn start

# Then run tests in another terminal
yarn test:e2e
```

### 3. "Browser not found"
```bash
npx playwright install
```

### 4. "Accessibility tests failing"
```bash
# Install axe-core
yarn add -D @axe-core/playwright
```

### 5. "Timeline tests timing out"
- Check if animations are disabled in test helpers
- Increase timeout in playwright.config.ts
- Verify timeline elements exist with correct selectors

## Test Best Practices

### 1. Use Test Helpers
```typescript
import { navigateToPage, waitForElementStable } from './utils/test-helpers';

// Instead of page.goto()
await navigateToPage(page);

// Instead of page.waitForTimeout()
await waitForElementStable(page, '.timeline-icon');
```

### 2. Reliable Selectors
```typescript
// Good - semantic selectors
page.locator('[data-testid="timeline-item"]')
page.locator('#timeline')

// Avoid - fragile CSS selectors
page.locator('.absolute.left-1\\/2.hidden.md\\:block')
```

### 3. Error Handling
```typescript
try {
  await page.locator('.element').click();
} catch (error) {
  await takeScreenshot(page, 'error-state');
  throw error;
}
```

### 4. Consistent Waits
```typescript
// Wait for network to be idle
await page.waitForLoadState('networkidle');

// Wait for element to be stable
await waitForElementStable(page, selector);

// Wait for animations to complete
await disableAnimations(page);
```

## Debugging Tests

### 1. Visual Debugging
```bash
# Run with headed browser
yarn test:e2e:headed

# Run with UI mode
yarn test:e2e:ui
```

### 2. Screenshots and Videos
- Check `test-results/` directory for artifacts
- Screenshots are taken on failure automatically
- Videos are retained on failure

### 3. Trace Viewer
```bash
# View traces for failed tests
npx playwright show-trace test-results/trace.zip
```

### 4. Console Logs
- Test output includes console.log statements
- Use `console.log()` in tests for debugging
- Check browser console in headed mode

## Contributing

### Adding New Tests
1. Create test file in `tests/` directory
2. Use `.spec.ts` extension
3. Import test helpers from `utils/test-helpers`
4. Follow existing patterns for consistency
5. Add appropriate error handling
6. Include screenshots for visual tests

### Updating Selectors
1. Prefer data-testid attributes
2. Use semantic HTML selectors when possible
3. Avoid brittle CSS class selectors
4. Update test helpers if selectors change globally

### Performance Considerations
- Use `test.describe.configure({ mode: 'parallel' })` for independent tests
- Disable animations for consistent timing
- Use appropriate timeouts for different test types
- Consider test isolation and cleanup
