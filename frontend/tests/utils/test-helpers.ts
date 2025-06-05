import { Page, expect } from '@playwright/test';

/**
 * Enhanced page navigation with better error handling and retries
 */
export async function navigateToPage(page: Page, url: string = '/') {
  try {
    await page.goto(url, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Wait for React to hydrate
    await page.waitForFunction(() => {
      return window.document.readyState === 'complete';
    });
    
    // Wait for any initial animations to complete
    await page.waitForTimeout(1000);
    
  } catch (error) {
    console.error(`Failed to navigate to ${url}:`, error);
    throw error;
  }
}

/**
 * Wait for element to be stable (not moving/animating)
 */
export async function waitForElementStable(page: Page, selector: string, timeout = 5000) {
  const element = page.locator(selector);
  await expect(element).toBeVisible();
  
  let previousBox = await element.boundingBox();
  let stableCount = 0;
  const requiredStableChecks = 3;
  
  while (stableCount < requiredStableChecks) {
    await page.waitForTimeout(100);
    const currentBox = await element.boundingBox();
    
    if (previousBox && currentBox && 
        previousBox.x === currentBox.x && 
        previousBox.y === currentBox.y &&
        previousBox.width === currentBox.width &&
        previousBox.height === currentBox.height) {
      stableCount++;
    } else {
      stableCount = 0;
    }
    
    previousBox = currentBox;
  }
}

/**
 * Scroll to element and wait for it to be in viewport
 */
export async function scrollToElement(page: Page, selector: string) {
  const element = page.locator(selector);
  await element.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500); // Allow scroll animation to complete
  await expect(element).toBeInViewport();
}

/**
 * Take screenshot with consistent naming and error handling
 */
export async function takeScreenshot(page: Page, name: string, options: any = {}) {
  try {
    await page.screenshot({
      path: `test-results/${name}.png`,
      fullPage: true,
      animations: 'disabled',
      ...options
    });
  } catch (error) {
    console.warn(`Failed to take screenshot ${name}:`, error);
  }
}

/**
 * Wait for all images to load
 */
export async function waitForImagesLoaded(page: Page) {
  await page.waitForFunction(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images.every(img => img.complete);
  });
}

/**
 * Disable animations for consistent testing
 */
export async function disableAnimations(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `
  });
}

/**
 * Check if element exists without throwing
 */
export async function elementExists(page: Page, selector: string): Promise<boolean> {
  try {
    const element = page.locator(selector);
    await element.waitFor({ state: 'attached', timeout: 1000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get element count safely
 */
export async function getElementCount(page: Page, selector: string): Promise<number> {
  try {
    return await page.locator(selector).count();
  } catch {
    return 0;
  }
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError!;
}
