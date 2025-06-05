import { test, expect } from '@playwright/test';
import { navigateToPage, takeScreenshot, scrollToElement } from './utils/test-helpers';

test.describe('Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToPage(page);
  });

  test('should display correctly on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await navigateToPage(page);
    
    // Verify main sections are visible and properly laid out
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('#timeline')).toBeVisible();
    
    // Check that content doesn't overflow horizontally
    const body = page.locator('body');
    const bodyBox = await body.boundingBox();
    expect(bodyBox?.width).toBeLessThanOrEqual(375);
    
    // Verify timeline layout on mobile
    await scrollToElement(page, '#timeline');
    const timelineItems = page.locator('.timeline-grid-item');
    await expect(timelineItems.first()).toBeVisible();
    
    // Take mobile screenshot
    await takeScreenshot(page, 'mobile-layout');
    
    console.log('✅ Mobile layout displays correctly');
  });

  test('should display correctly on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.reload();
    await navigateToPage(page);
    
    // Verify main sections are visible
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('#timeline')).toBeVisible();
    
    // Check desktop-specific elements
    await scrollToElement(page, '#timeline');
    
    // Verify timeline line is visible on desktop
    const timelineLine = page.locator('.timeline-line-desktop');
    await expect(timelineLine).toBeVisible();
    
    // Take desktop screenshot
    await takeScreenshot(page, 'desktop-layout');
    
    console.log('✅ Desktop layout displays correctly');
  });

  test('should handle viewport transitions smoothly', async ({ page }) => {
    // Start with desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.reload();
    await navigateToPage(page);
    
    // Verify desktop layout
    await scrollToElement(page, '#timeline');
    const timelineLine = page.locator('.timeline-line-desktop');
    await expect(timelineLine).toBeVisible();
    
    // Switch to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500); // Allow layout to adjust
    
    // Verify mobile layout adjustments
    const timelineItems = page.locator('.timeline-grid-item');
    await expect(timelineItems.first()).toBeVisible();
    
    // Verify no horizontal overflow
    const body = page.locator('body');
    const bodyBox = await body.boundingBox();
    expect(bodyBox?.width).toBeLessThanOrEqual(375);
    
    console.log('✅ Viewport transitions handled smoothly');
  });

  test('should maintain functionality across viewports', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1440, height: 900, name: 'desktop' }
    ];
    
    for (const viewport of viewports) {
      // Set viewport
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.reload();
      await navigateToPage(page);
      
      // Test command menu functionality
      const commandButton = page.locator('button[aria-label="Open command palette"]');
      await expect(commandButton).toBeVisible();
      await commandButton.click();
      
      const commandDialog = page.locator('div[role="dialog"]');
      await expect(commandDialog).toBeVisible();
      
      // Close command menu
      await page.keyboard.press('Escape');
      await expect(commandDialog).not.toBeVisible();
      
      // Test timeline functionality
      await scrollToElement(page, '#timeline');
      const firstIcon = page.locator('.timeline-icon').first();
      await expect(firstIcon).toBeVisible();
      await firstIcon.click();
      
      // Wait for expansion
      await page.waitForTimeout(300);
      
      // Verify expanded content
      const expandedContent = page.locator('.timeline-expanded-content').first();
      await expect(expandedContent).toBeVisible();
      
      // Collapse
      await firstIcon.click();
      await page.waitForTimeout(300);
      
      console.log(`✅ Functionality verified on ${viewport.name} (${viewport.width}x${viewport.height})`);
    }
  });
});
