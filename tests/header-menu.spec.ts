import { test, expect } from '@playwright/test';

test.describe('Header and CommandMenu Spacing', () => {
  // Use Desktop-1440 project configuration
  test.use({ viewport: { width: 1440, height: 900 } });

  test('Header should have sufficient top padding (≥ 64px) from pt-[var(--space-section)]', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Get the ParallaxBanner container by its ID instead of complex class selector
    const headerContainer = await page.locator('#top');
    await expect(headerContainer).toBeVisible();
    
    // Get computed style for the header container's padding-top
    const headerPaddingTop = await headerContainer.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element);
      return parseInt(computedStyle.paddingTop, 10);
    });
    
    // Assert that header padding is sufficient (≥ 64px)
    expect(headerPaddingTop).toBeGreaterThanOrEqual(64);
  });

  test('CommandMenu should have sufficient vertical margin (≥ 24px) from my-[var(--space-component)]', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Open command menu by clicking on it - using a more reliable selector
    const commandButton = await page.locator('div[aria-label="Open command palette"]');
    await commandButton.click();
    
    // Wait for command menu to be visible - using a simpler approach
    await page.waitForSelector('div[role="dialog"]', { state: 'visible' });
    
    // Get the command menu container element - using a simpler selector
    const commandMenuContainer = await page.locator('.max-w-md').first();
    await expect(commandMenuContainer).toBeVisible();
    
    // Get computed styles for the command menu's vertical margins
    const commandMenuMargins = await commandMenuContainer.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element);
      return {
        marginTop: parseInt(computedStyle.marginTop, 10),
        marginBottom: parseInt(computedStyle.marginBottom, 10)
      };
    });
    
    // Calculate total vertical margin
    const totalVerticalMargin = commandMenuMargins.marginTop + commandMenuMargins.marginBottom;
    
    // Assert that command menu top margin is sufficient (≥ 24px)
    expect(commandMenuMargins.marginTop).toBeGreaterThanOrEqual(24);
    
    // Assert that command menu bottom margin is sufficient (≥ 24px)
    expect(commandMenuMargins.marginBottom).toBeGreaterThanOrEqual(24);
    
    // Assert that total vertical margin is sufficient (≥ 48px)
    expect(totalVerticalMargin).toBeGreaterThanOrEqual(48);
  });
  
  test('Both Header and CommandMenu spacing requirements are met', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Check header padding using ID selector
    const headerContainer = await page.locator('#top');
    const headerPaddingTop = await headerContainer.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element);
      return parseInt(computedStyle.paddingTop, 10);
    });
    
    // Open command menu
    const commandButton = await page.locator('div[aria-label="Open command palette"]');
    await commandButton.click();
    
    // Wait for command menu to be visible
    await page.waitForSelector('div[role="dialog"]', { state: 'visible' });
    
    // Check command menu margins with simpler selector
    const commandMenuContainer = await page.locator('.max-w-md').first();
    const commandMenuMargins = await commandMenuContainer.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element);
      return {
        marginTop: parseInt(computedStyle.marginTop, 10),
        marginBottom: parseInt(computedStyle.marginBottom, 10)
      };
    });
    
    // const totalVerticalMargin = commandMenuMargins.marginTop + commandMenuMargins.marginBottom;
    
    // Final assertions
    expect(headerPaddingTop, 'Header top padding should be at least 64px').toBeGreaterThanOrEqual(64);
    expect(commandMenuMargins.marginTop, 'Command menu top margin should be at least 24px').toBeGreaterThanOrEqual(24);
    expect(commandMenuMargins.marginBottom, 'Command menu bottom margin should be at least 24px').toBeGreaterThanOrEqual(24);
  });
});
