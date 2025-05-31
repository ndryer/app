import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Test directory and file patterns
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  
  // Dev server configuration
  webServer: {
    command: 'yarn --cwd frontend start',
    port: 3000,
    reuseExistingServer: true,
  },
  
  // Global setup
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  
  // Test timeout
  timeout: 30000,
  
  // Multi-viewport testing configuration
  projects: [
    {
      name: 'Mobile-320',
      use: { viewport: { width: 320, height: 640 } },
    },
    {
      name: 'Tablet-768',
      use: { viewport: { width: 768, height: 1024 } },
    },
    {
      name: 'Desktop-1440',
      use: { viewport: { width: 1440, height: 900 } },
    },
  ],
  
  // Test reporter
  reporter: [['html', { open: 'never' }], ['list']],
  
  // Folder for test artifacts like screenshots, videos, traces
  outputDir: 'test-results/',
});
