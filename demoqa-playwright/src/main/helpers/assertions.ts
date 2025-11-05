import { expect, Locator } from '@playwright/test';

export class Assertions {
  async verifyTextContains(locator: Locator, expected: string) {
    const text = await locator.textContent();
    expect(text).toContain(expected);
  }

  async verifyElementVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }
  async verifyElementEnabled(locator: Locator) {
    await expect(locator).toBeEnabled();
  }
  async verifyElementDisabled(locator: Locator) {
    await expect(locator).toBeDisabled();
  }
}
