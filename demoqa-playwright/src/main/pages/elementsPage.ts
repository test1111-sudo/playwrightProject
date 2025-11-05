import { Page, Locator } from '@playwright/test';
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
readonly successMessage: Locator;
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
readonly webTableMenu: Locator;
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
    this.successMessage = page.locator('#result');
    this.plusIcon = page.locator('.rct-icon.rct-icon-expand-all');
    this.minusIcon = page.locator('.rct-icon.rct-icon-collapse-all');
    this.desktopCheckbox = page.locator('label[for="tree-node-desktop"] .rct-checkbox');
    this.notesCheckbox = page.locator('label[for="tree-node-notes"] .rct-checkbox');
    this.commandsCheckbox = page.locator('label[for="tree-node-commands"] .rct-checkbox');
    this.documentsCheckbox = page.locator('label[for="tree-node-documents"] .rct-checkbox');
    this.downloadsCheckbox = page.locator('label[for="tree-node-downloads"] .rct-checkbox');

    // 🔹 Radio Button locators
    this.yesRadioButton = page.locator('#yesRadio');
    this.impressiveRadioButton = page.locator('#impressiveRadio');
    this.noRadioButton = page.locator('#noRadio');
    this.radioButtonMenu = page.locator('span:has-text("Radio Button")');
    this.youHaveSelectedMessage = page.locator('.text-success');

    // 🔹 Web Table locators
    this.webTableMenu = page.locator('span:has-text("Web Tables")');
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
    this.deleteButton = page.locator('#delete-record-1 > svg > path');  
    this.emptyFieldMessage = page.locator('.mr-2:has-text("This field is required")');
    this.noRowsFoundMessage = page.locator('.rt-noData');
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

    await this.homeCheckbox.click();
    await this.desktopCheckbox.click();
    await this.documentsCheckbox.click();
    await this.downloadsCheckbox.click();

    await this.collapseAllButton.click();
  }

  // ✅ Add helper to read the result text
  async getCheckBoxResult() {
    return await this.successMessage.textContent();
  }

  // ✅ Add methods for radio button interactions
  async selectYesRadioButton() {
    await this.radioButtonMenu.click();
    await this.yesRadioButton.click();
  }

  async selectImpressiveRadioButton() {
    await this.radioButtonMenu.click();
    await this.impressiveRadioButton.click();
  }

  async selectNoRadioButton() {
    await this.radioButtonMenu.click();
    await this.noRadioButton.click();

  }
  //WEBTABLE METHODS
  async openWebTable() {
    await this.webTableMenu.click();
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
}

