import { Page, Locator } from '@playwright/test';
import { BaseHelp } from '../helpers/baseHelp';

export class HomePage extends BaseHelp {
  readonly elementsCard: Locator;

  constructor(page: Page) {
    super(page);
    this.elementsCard = page.locator('.card:has-text("Elements")');
  }

  async goToElements() {
    await this.click(this.elementsCard);
  }
}
