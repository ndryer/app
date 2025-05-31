import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Use existing server
  use: {
    baseURL: 'http://localhost:3000/app',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  
  // Test timeout
  timeout: 30000,
  
  // Only include Desktop-1440 project for our test
  projects: [
    {
      name: 'Desktop-1440',
      use: { viewport: { width: 1440, height: 900 } },
    },
  ],
  
  // Simple reporter
  reporter: 'list',
  
  // Folder for test artifacts
  outputDir: 'test-results/',
});
