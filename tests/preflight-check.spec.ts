import { test, expect } from '@playwright/test';

test.describe('Component Spacing Preflight Check', () => {
  test('Header should have sufficient top padding and CommandMenu should have sufficient vertical margin', async ({ page }) => {
    // Set viewport size directly to 1440x900
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Check header padding (container div inside ParallaxBanner)
    const headerContainer = await page.locator('.container').first();
    await expect(headerContainer).toBeVisible();
    
    // Get computed styles for the header container
    const headerPaddingTop = await headerContainer.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element);
      return parseInt(computedStyle.paddingTop, 10);
    });
    
    // Open command menu by clicking on it
    const commandButton = await page.locator('div[aria-label="Open command palette"]');
    await commandButton.click();
    
    // Wait for command menu to be visible
    const commandMenu = await page.locator('.cmdk-root').first();
    await expect(commandMenu).toBeVisible();
    
    // Get the command menu container element (simplified selector)
    const commandMenuContainer = await page.locator('.max-w-md').first();
    
    // Get computed styles for the command menu
    const commandMenuStyles = await commandMenuContainer.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element);
      return {
        marginTop: parseInt(computedStyle.marginTop, 10),
        marginBottom: parseInt(computedStyle.marginBottom, 10)
      };
    });
    
    // Check if the values meet the requirements
    const totalVerticalMargin = commandMenuStyles.marginTop + commandMenuStyles.marginBottom;
    
    // Assert that header padding is sufficient (≥ 64px)
    expect(headerPaddingTop).toBeGreaterThanOrEqual(64);
    
    // Assert that command menu vertical margin is sufficient (≥ 24px)
    expect(totalVerticalMargin).toBeGreaterThanOrEqual(24);
  });
});
