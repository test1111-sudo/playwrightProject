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
  reporter: [['list'], process.env.CI ? ['html', { open: 'never' }] : ['html']],
  use: {
    baseURL: 'https://demoqa.com',
    trace: 'on-first-retry',
    headless: false
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});