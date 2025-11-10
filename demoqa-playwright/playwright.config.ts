import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/test',
  
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
 
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
   reporter: [
    ['list'], // optional default console reporter
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000,
    baseURL: 'https://demoqa.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  }
});