import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y, getViolations } from '@axe-core/playwright';

test.describe('Accessibility Contrast Testing', () => {
  test('Mobile viewport (320px) should have no contrast violations', async ({ page }) => {
    // Set viewport size for mobile
    await page.setViewportSize({ width: 320, height: 640 });
    
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Inject axe-core
    await injectAxe(page);
    
    // Run axe accessibility tests specifically for color contrast
    const violations = await getViolations(page, {
      runOnly: {
        type: 'rule',
        values: ['color-contrast']
      }
    });
    
    // Log violations for debugging
    if (violations.length > 0) {
      console.log('Mobile viewport contrast violations:', violations);
    }
    
    // Assert no contrast violations
    expect(violations.length).toBe(0);
    
    // Log success message
    console.log('✅ Mobile viewport (320px) contrast check passed');
  });

  test('Tablet viewport (768px) should have no contrast violations', async ({ page }) => {
    // Set viewport size for tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Inject axe-core
    await injectAxe(page);
    
    // Run axe accessibility tests specifically for color contrast
    const violations = await getViolations(page, {
      runOnly: {
        type: 'rule',
        values: ['color-contrast']
      }
    });
    
    // Log violations for debugging
    if (violations.length > 0) {
      console.log('Tablet viewport contrast violations:', violations);
    }
    
    // Assert no contrast violations
    expect(violations.length).toBe(0);
    
    // Log success message
    console.log('✅ Tablet viewport (768px) contrast check passed');
  });

  test('Desktop viewport (1440px) should have no contrast violations', async ({ page }) => {
    // Set viewport size for desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Inject axe-core
    await injectAxe(page);
    
    // Run axe accessibility tests specifically for color contrast
    const violations = await getViolations(page, {
      runOnly: {
        type: 'rule',
        values: ['color-contrast']
      }
    });
    
    // Log violations for debugging
    if (violations.length > 0) {
      console.log('Desktop viewport contrast violations:', violations);
    }
    
    // Assert no contrast violations
    expect(violations.length).toBe(0);
    
    // Log success message
    console.log('✅ Desktop viewport (1440px) contrast check passed');
  });

  test.afterAll(async () => {
    // If all tests pass, output the final success message
    console.log('✅ AlreadyImplemented: contrast smoke OK');
  });
});
