import { Page, Locator,expect } from '@playwright/test';
import { BaseHelp } from '../helpers/baseHelp';

export class ElementsPage extends BaseHelp {
// Text Box locators
readonly textBoxMenu: Locator;
readonly fullNameInput: Locator;
readonly emailInput: Locator;
readonly currentAddressInput: Locator;
readonly permanentAddressInput: Locator;
readonly submitBtn: Locator;
readonly outputBox: Locator;

// Check Box locators
readonly checkboxMenu: Locator;
readonly homeCheckbox: Locator;
readonly expandAllButton: Locator;
readonly collapseAllButton: Locator;
readonly homeCheckboxChecked: Locator;
readonly plusIcon: Locator;
readonly minusIcon: Locator;
readonly desktopCheckbox: Locator;
readonly notesCheckbox: Locator;
readonly commandsCheckbox: Locator;
readonly documentsCheckbox: Locator;
readonly downloadsCheckbox: Locator;

//Radio Button locators
readonly radioButtonMenu: Locator;
readonly yesRadioButton: Locator;
readonly impressiveRadioButton: Locator
readonly noRadioButton: Locator;
readonly youHaveSelectedMessage: Locator;

//WebTable locators
readonly webTablesMenu: Locator;
readonly addButton: Locator;
readonly searchBox: Locator;
readonly firstNameInput: Locator;
readonly lastNameInput: Locator;
readonly emailInputWeb: Locator;
readonly ageInput: Locator;
readonly salaryInput: Locator;
readonly departmentInput: Locator;
readonly submitButton: Locator;
readonly tableRows: Locator;
readonly editButton: Locator;
readonly deleteButton: Locator;
readonly emptyFieldMessage: Locator;
readonly noRowsFoundMessage: Locator;

//Buttons locators
readonly buttonsMenu: Locator;
readonly doubleClickBtn: Locator;
readonly rightClickBtn: Locator;
readonly clickMeBtn: Locator;
readonly doubleClickMessage: Locator;
readonly rightClickMessage: Locator;
readonly dynamicClickMessage: Locator;

  constructor(page: Page) {
    super(page);

    // 🔹 Text Box locators
    this.textBoxMenu = page.locator('span:has-text("Text Box")');
    this.fullNameInput = page.locator('#userName');
    this.emailInput = page.locator('#userEmail');
    this.currentAddressInput = page.locator('#currentAddress');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitBtn = page.locator('#submit');
    this.outputBox = page.locator('#output');

    // 🔹 Check Box locators
    this.checkboxMenu = page.locator('span:has-text("Check Box")'); 
    this.homeCheckbox = page.locator('label[for="tree-node-home"] .rct-checkbox');
    this.expandAllButton = page.locator('button[title="Expand all"]');
    this.collapseAllButton = page.locator('button[title="Collapse all"]');
    this.homeCheckboxChecked = page.locator('.rct-icon.rct-icon-check');
    this.plusIcon = page.locator('.rct-icon.rct-icon-expand-all');
    this.minusIcon = page.locator('.rct-icon.rct-icon-collapse-all');
    this.desktopCheckbox = page.locator('label[for="tree-node-desktop"] .rct-checkbox');
    this.notesCheckbox = page.locator('label[for="tree-node-notes"] .rct-checkbox');
    this.commandsCheckbox = page.locator('label[for="tree-node-commands"] .rct-checkbox');
    this.documentsCheckbox = page.locator('label[for="tree-node-documents"] .rct-checkbox');
    this.downloadsCheckbox = page.locator('label[for="tree-node-downloads"] .rct-checkbox');

   
    // 🔹 Radio Button locators
    this.radioButtonMenu = page.locator('span:has-text("Radio Button")');
    this.yesRadioButton = page.locator('label[for="yesRadio"]');
    this.impressiveRadioButton = page.locator('label[for="impressiveRadio"]');
    this.noRadioButton = page.getByLabel('No');
    this.youHaveSelectedMessage = page.locator('.text-success');


    // 🔹 Web Table locators
    this.webTablesMenu = page.locator('span:has-text("Web Tables")');
    this.addButton = page.locator('#addNewRecordButton');
    this.searchBox = page.locator('#searchBox');
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInputWeb = page.locator('#userEmail');
    this.ageInput = page.locator('#age');
    this.salaryInput = page.locator('#salary');
    this.departmentInput = page.locator('#department');
    this.submitButton = page.locator('#submit');
    this.tableRows = page.locator('.rt-tbody .rt-tr-group');
    this.editButton = page.locator('.action-buttons span[title="Edit"]');
    this.deleteButton = page.locator('[id^="delete-record-"]'); 
    this.emptyFieldMessage = page.locator('.mr-2:has-text("This field is required")');
    this.noRowsFoundMessage = page.locator('.rt-noData');
 
  // 🔹 Buttons locators
    this.buttonsMenu = page.locator('span:has-text("Buttons")');
    this.doubleClickBtn = page.locator('#doubleClickBtn');
    this.rightClickBtn = page.locator('#rightClickBtn');
    // The "Click Me" button doesn't have an ID, so we use a more specific selector
    this.clickMeBtn = page.locator('button:has-text("Click Me")').nth(2); // Third button
    this.doubleClickMessage = page.locator('#doubleClickMessage');
    this.rightClickMessage = page.locator('#rightClickMessage');
    this.dynamicClickMessage = page.locator('#dynamicClickMessage');
    }






  // ✅ Use method arguments instead of hardcoded strings
    async fillTextBox(name: string, email: string, currentAddress: string, permanentAddress: string) {
      await this.textBoxMenu.click();
      await this.fullNameInput.fill(name);
      await this.emailInput.fill(email);
      await this.currentAddressInput.fill(currentAddress);
      await this.permanentAddressInput.fill(permanentAddress);
      await this.submitBtn.click();
      
    }

    // ✅ Make checkbox interactions logical and verifiable
    async checkHomeCheckbox() {
      await this.checkboxMenu.click();
      await this.expandAllButton.click();
      await this.desktopCheckbox.click();
      await this.documentsCheckbox.click();
      await this.downloadsCheckbox.click();
    
    }
  //radio button methods
  async openRadioButtonSection() {
      await this.radioButtonMenu.click();
    }
  async selectYesRadio() {
      // ✅ FIX: Use force:true because label intercepts click
      await this.yesRadioButton.click({ force: true });
    }

    async selectImpressiveRadio() {
      // ✅ FIX: Use force:true because label intercepts click
      await this.impressiveRadioButton.click({ force: true });
    }

    async isNoRadioDisabled(): Promise<boolean> {
      return await this.noRadioButton.isDisabled();
    }

    //WEBTABLE METHODS
    async openWebTable() {
    await this.webTablesMenu.click();
  }

    async addNewRecord(firstName: string, lastName: string, email: string, age: number, salary: number, department: string) {
      await this.addButton.click();
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.emailInputWeb.fill(email);
      await this.ageInput.fill(age.toString());
      await this.salaryInput.fill(salary.toString());
      await this.departmentInput.fill(department);
      await this.submitButton.click();
    }
    async getTableRowsCount(): Promise<number> {
      return await this.tableRows.count();
    }
    async deleteRow() {
      await this.deleteButton.click();
    }
    async editRow(newFirstName: string) {
      await this.editButton.click();
      await this.firstNameInput.fill(newFirstName);
      await this.submitButton.click();
    }
    async searchInTable(firstName: string) {
      await this.searchBox.fill(firstName);
    }
    // In elementsPage.ts
  // In elementsPage.ts
 async deleteAllRows() {
  while (await this.page.locator('[id^="delete-record-"]').count() > 0) {
    await this.page.locator('[id^="delete-record-"]').first().click();
    await this.page.waitForLoadState('domcontentloaded'); // ensure re-render
  }
  await expect(this.page.locator('[id^="delete-record-"]')).toHaveCount(0);
}




// BUTTONS METHODS
async openButtonsSection() {
  await this.buttonsMenu.click();
}

async performDoubleClick() {
  await this.doubleClickBtn.dblclick();
}

async performRightClick() {
  await this.rightClickBtn.click({ button: 'right' });
}

async performDynamicClick() {
  await this.clickMeBtn.click();
}

async getDoubleClickMessage(): Promise<string | null> {
  return await this.doubleClickMessage.textContent();
}

async getRightClickMessage(): Promise<string | null> {
  return await this.rightClickMessage.textContent();
}

async getDynamicClickMessage(): Promise<string | null> {
  return await this.dynamicClickMessage.textContent();
}
}
