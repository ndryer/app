import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Touch Target Testing', () => {
  test('Desktop viewport (1440px) should have no WCAG 2.5.8 violations (touch target size)', async ({ page }) => {
    // Set viewport size for desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Run axe scan with focus on WCAG 2.5.8 (target size)
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules('target-size')
      .analyze();
    
    // Expect no WCAG 2.5.8 violations
    expect(accessibilityScanResults.violations.length).toBe(0);
  });

  test('Mobile viewport (320px) should have no WCAG 2.5.8 violations (touch target size)', async ({ page }) => {
    // Set viewport size for mobile
    await page.setViewportSize({ width: 320, height: 640 });
    
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Run axe scan with focus on WCAG 2.5.8 (target size)
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules('target-size')
      .analyze();
    
    // Expect no WCAG 2.5.8 violations
    expect(accessibilityScanResults.violations.length).toBe(0);
  });

  test.afterAll(async () => {
    // If all tests pass, output the final success message
    // console.log('✅ AlreadyImplemented: tap & focus OK'); // Removed this log
  });
}); 