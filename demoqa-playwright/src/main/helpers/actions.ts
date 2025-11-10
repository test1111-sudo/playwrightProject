import { Locator } from '@playwright/test';
import { BaseHelp } from './baseHelp';

export class Actions extends BaseHelp {
  async clickElement(locator: Locator) {
    await this.click(locator);
  }

  async enterText(locator: Locator, text: string) {
    await this.type(locator, text);
  }
  
}
