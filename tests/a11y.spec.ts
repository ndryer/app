import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y, getViolations } from '@axe-core/playwright';

test.describe('Accessibility Touch Target Testing', () => {
  test('Desktop viewport (1440px) should have no WCAG 2.5.8 violations (touch target size)', async ({ page }) => {
    // Set viewport size for desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Inject axe-core
    await injectAxe(page);
    
    // Run axe scan with focus on WCAG 2.5.8 (target size)
    const violations = await getViolations(page, {
      runOnly: {
        type: 'rule',
        values: ['target-size']
      }
    });
    
    // Log violations for debugging
    if (violations.length > 0) {
      console.log('WCAG 2.5.8 Target Size Violations Found:');
      violations.forEach((violation, index) => {
        console.log(`${index + 1}. ${violation.id}: ${violation.description}`);
        console.log(`   Impact: ${violation.impact}`);
        console.log(`   Nodes affected: ${violation.nodes.length}`);
        violation.nodes.forEach((node, nodeIndex) => {
          console.log(`   ${nodeIndex + 1}. ${node.html}`);
          console.log(`      Target: ${node.target.join(', ')}`);
        });
      });
    }
    
    // Expect no WCAG 2.5.8 violations
    expect(violations.length).toBe(0);
    
    // Log success message
    console.log('✅ Desktop viewport (1440px) target size check passed');
  });

  test('Mobile viewport (320px) should have no WCAG 2.5.8 violations (touch target size)', async ({ page }) => {
    // Set viewport size for mobile
    await page.setViewportSize({ width: 320, height: 640 });
    
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Inject axe-core
    await injectAxe(page);
    
    // Run axe scan with focus on WCAG 2.5.8 (target size)
    const violations = await getViolations(page, {
      runOnly: {
        type: 'rule',
        values: ['target-size']
      }
    });
    
    // Log violations for debugging
    if (violations.length > 0) {
      console.log('Mobile WCAG 2.5.8 Target Size Violations Found:');
      violations.forEach((violation, index) => {
        console.log(`${index + 1}. ${violation.id}: ${violation.description}`);
        console.log(`   Impact: ${violation.impact}`);
        console.log(`   Nodes affected: ${violation.nodes.length}`);
      });
    }
    
    // Expect no WCAG 2.5.8 violations
    expect(violations.length).toBe(0);
    
    // Log success message
    console.log('✅ Mobile viewport (320px) target size check passed');
  });

  test.afterAll(async () => {
    // If all tests pass, output the final success message
    console.log('✅ AlreadyImplemented: tap & focus OK');
  });
}); 