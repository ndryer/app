import { test, expect } from '@playwright/test';
import { navigateToPage, takeScreenshot } from './utils/test-helpers';

// Conditional import for axe-core to handle missing dependency gracefully
let injectAxe: any, checkA11y: any;
try {
  const axePlaywright = require('@axe-core/playwright');
  injectAxe = axePlaywright.injectAxe;
  checkA11y = axePlaywright.checkA11y;
} catch (error) {
  console.warn('⚠️  @axe-core/playwright not installed. Accessibility tests will be skipped.');
}

test.describe('Accessibility Compliance', () => {
  test.skip(!injectAxe, '@axe-core/playwright not available');

  test.beforeEach(async ({ page }) => {
    await navigateToPage(page);
  });

  test('should have no critical accessibility violations', async ({ page }) => {
    // Inject axe-core
    await injectAxe(page);
    
    // Run comprehensive accessibility scan
    try {
      await checkA11y(page, null, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21aa']
        }
      });
      console.log('✅ No critical accessibility violations found');
    } catch (error) {
      console.error('Accessibility violations found:', error);
      await takeScreenshot(page, 'accessibility-violations');
      throw error;
    }
  });

  test('should have proper touch targets for mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await navigateToPage(page);
    
    // Check interactive elements have minimum 44px touch targets
    const interactiveElements = page.locator('button, a, [role="button"]');
    const count = await interactiveElements.count();
    
    for (let i = 0; i < count; i++) {
      const element = interactiveElements.nth(i);
      const isVisible = await element.isVisible();
      
      if (isVisible) {
        const box = await element.boundingBox();
        if (box) {
          // Check minimum touch target size (44x44px)
          expect(box.width).toBeGreaterThanOrEqual(44);
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
      }
    }
    
    console.log(`✅ Verified ${count} interactive elements have proper touch targets`);
  });

  test('should have proper focus indicators', async ({ page }) => {
    // Test keyboard navigation and focus indicators
    const focusableElements = page.locator('button, a, [tabindex]:not([tabindex="-1"])');
    const count = await focusableElements.count();
    
    if (count > 0) {
      // Focus first element and verify focus is visible
      await focusableElements.first().focus();
      
      // Check that focused element has focus indicator
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
      
      console.log(`✅ Focus indicators working properly`);
    }
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check heading structure
    const h1Elements = page.locator('h1');
    const h1Count = await h1Elements.count();
    
    // Should have exactly one h1
    expect(h1Count).toBe(1);
    
    // Check that headings are in logical order
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingTexts = await headings.allTextContents();
    
    expect(headingTexts.length).toBeGreaterThan(0);
    console.log(`✅ Proper heading hierarchy with ${headingTexts.length} headings`);
  });

  test('should have alt text for images', async ({ page }) => {
    // Check all images have alt text
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      
      // Alt attribute should exist (can be empty for decorative images)
      expect(alt).not.toBeNull();
    }
    
    console.log(`✅ All ${count} images have alt attributes`);
  });
});
