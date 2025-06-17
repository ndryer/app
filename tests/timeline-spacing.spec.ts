import { test, expect } from '@playwright/test';

test.describe('Timeline Spacing Preflight Check', () => {
  test('Timeline should have correct spacing, padding, and margins', async ({ page }) => {
    // Set viewport size directly to 1440x900
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Scroll to the timeline section to ensure it's loaded
    await page.evaluate(() => {
      const timelineSection = document.getElementById('timeline');
      if (timelineSection) {
        timelineSection.scrollIntoView();
      }
    });

    // Wait for timeline elements to be visible
    const timelineElement = await page.locator('.vertical-timeline').first();
    await expect(timelineElement).toBeVisible();
    
    // 1. Check individual timeline cards for 24px padding (p-6)
    const timelineCard = await page.locator('.vertical-timeline-element-content').first();
    await expect(timelineCard).toBeVisible();
    
    const cardPadding = await timelineCard.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element);
      return {
        paddingTop: parseInt(computedStyle.paddingTop, 10),
        paddingRight: parseInt(computedStyle.paddingRight, 10),
        paddingBottom: parseInt(computedStyle.paddingBottom, 10),
        paddingLeft: parseInt(computedStyle.paddingLeft, 10)
      };
    });
    
    // 2. Check spacing between timeline items (32px vertical spacing - space-y-8)
    const timelineItems = await page.locator('.vertical-timeline-element').all();
    
    // Need at least 2 items to check spacing
    expect(timelineItems.length).toBeGreaterThan(1);
    
    // Get the vertical spacing between the first two timeline items
    const verticalSpacing = await page.evaluate(() => {
      const items = document.querySelectorAll('.vertical-timeline-element');
      if (items.length < 2) return 0;
      
      const firstRect = items[0].getBoundingClientRect();
      const secondRect = items[1].getBoundingClientRect();
      
      // Calculate the space between the bottom of the first item and the top of the second
      return secondRect.top - firstRect.bottom;
    });
    
    // 3. Check timeline line margin-end (16px - mr-4)
    const timelineLineMargin = await page.evaluate(() => {
      // The timeline line is created with a pseudo-element ::before on .vertical-timeline-element
      const element = document.querySelector('.vertical-timeline-element');
      if (!element) return 0;
      
      // Get the computed style of the pseudo-element
      const style = window.getComputedStyle(element, '::before');
      return parseInt(style.marginRight, 10);
    });
    
    // Assert that all spacing requirements are met
    const isPaddingCorrect = cardPadding.paddingTop === 24 && 
                            cardPadding.paddingRight === 24 && 
                            cardPadding.paddingBottom === 24 && 
                            cardPadding.paddingLeft === 24;
    
    const isSpacingCorrect = verticalSpacing === 32;
    const isMarginCorrect = timelineLineMargin === 16;
    
    expect(isPaddingCorrect).toBeTruthy();
    expect(isSpacingCorrect).toBeTruthy();
    expect(isMarginCorrect).toBeTruthy();
    
    // If all tests pass, output the success message to console
    // if (isPaddingCorrect && isSpacingCorrect && isMarginCorrect) {
    //   console.log('✅ AlreadyImplemented: timeline spacing OK');
    // }
  });
});
