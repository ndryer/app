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
    
    // DEBUG: Log DOM structure of timeline elements to understand the hierarchy
    await page.evaluate(() => {
      console.log('--- Timeline DOM Structure ---');
      
      // Get the main timeline container
      const timelineContainer = document.querySelector('.vertical-timeline');
      if (!timelineContainer) {
        console.log('Timeline container not found');
        return;
      }
      
      // Log the container and its classes
      console.log('Timeline container:', timelineContainer.tagName);
      console.log('Timeline container classes:', timelineContainer.className);
      console.log('Timeline container children count:', timelineContainer.children.length);
      
      // Log the structure of the first few timeline elements
      const timelineElements = document.querySelectorAll('.vertical-timeline-element');
      console.log('Timeline elements count:', timelineElements.length);
      
      if (timelineElements.length > 0) {
        // Log the first element's structure
        const firstElement = timelineElements[0];
        console.log('First timeline element classes:', firstElement.className);
        console.log('First timeline element children:', firstElement.children.length);
        
        // Log the computed style of the element
        const style = window.getComputedStyle(firstElement);
        console.log('First element margin-top:', style.marginTop);
        console.log('First element margin-bottom:', style.marginBottom);
        
        // Check if there's a parent with space-y-8
        let parent = firstElement.parentElement;
        while (parent) {
          console.log('Parent element:', parent.tagName);
          console.log('Parent classes:', parent.className);
          
          // Check if this parent has space-y-8
          if (parent.className.includes('space-y-8')) {
            console.log('Found space-y-8 parent!');
            
            // Check computed style of this parent
            const parentStyle = window.getComputedStyle(parent);
            console.log('Parent with space-y-8 - row-gap:', parentStyle.rowGap);
            console.log('Parent with space-y-8 - display:', parentStyle.display);
          }
          
          parent = parent.parentElement;
        }
        
        // If there's a second element, check the spacing between them
        if (timelineElements.length > 1) {
          const secondElement = timelineElements[1];
          const firstRect = firstElement.getBoundingClientRect();
          const secondRect = secondElement.getBoundingClientRect();
          
          console.log('First element bottom:', firstRect.bottom);
          console.log('Second element top:', secondRect.top);
          console.log('Space between elements:', secondRect.top - firstRect.bottom);
          
          // Check if elements have direct siblings that might affect spacing
          const directSibling = firstElement.nextElementSibling;
          if (directSibling) {
            console.log('Direct sibling of first element:', directSibling.tagName);
            console.log('Is direct sibling the second timeline element:', directSibling === secondElement);
          } else {
            console.log('No direct sibling found - elements might be nested differently');
          }
        }
      }
      
      console.log('--- End Timeline DOM Structure ---');
    });
    
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
    
    console.log(`Timeline card padding - top: ${cardPadding.paddingTop}px, right: ${cardPadding.paddingRight}px, bottom: ${cardPadding.paddingBottom}px, left: ${cardPadding.paddingLeft}px`);
    
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
    
    console.log(`Vertical spacing between timeline items: ${verticalSpacing}px`);
    
    // 3. Check timeline line margin-end (16px - mr-4)
    const timelineLineMargin = await page.evaluate(() => {
      // The timeline line is created with a pseudo-element ::before on .vertical-timeline-element
      const element = document.querySelector('.vertical-timeline-element');
      if (!element) return 0;
      
      // Get the computed style of the pseudo-element
      const style = window.getComputedStyle(element, '::before');
      return parseInt(style.marginRight, 10);
    });
    
    console.log(`Timeline line margin-end: ${timelineLineMargin}px`);
    
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
    if (isPaddingCorrect && isSpacingCorrect && isMarginCorrect) {
      console.log('✅ AlreadyImplemented: timeline spacing OK');
    }
  });
});
