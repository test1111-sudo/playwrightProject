import { test } from '@playwright/test';
import { HomePage } from '@pages/homePage';
import { ElementsPage } from '@pages/elementsPage';
import { Assertions } from '@helpers/assertions';
import { testData } from '@helpers/testData';

test.describe('DemoQA testbox  Tests', () => {
  test('Fill text box and verify results', async ({ page }) => {
    const home = new HomePage(page);
    const elements = new ElementsPage(page);
    const asserts = new Assertions();

    await home.navigateTo(testData.baseUrl);
    await home.goToElements();
    await elements.fillTextBox(testData.user.name, testData.user.email, testData.user.currentAddress, testData.user.permanentAddress);
    await asserts.verifyTextContains(elements.outputBox, testData.user.name);
    await asserts.verifyTextContains(elements.outputBox, testData.user.email);
    await asserts.verifyTextContains(elements.outputBox, testData.user.currentAddress);
    await asserts.verifyTextContains(elements.outputBox, testData.user.permanentAddress);
  });
});


test.describe('DemoQA checkbox  Tests', () => {
  test('Fill text box and verify results', async ({ page }) => {
    const home = new HomePage(page);
    const elements = new ElementsPage(page);
    const asserts = new Assertions();

    await home.navigateTo(testData.baseUrl);
    await home.goToElements();
    await elements.checkHomeCheckbox()
    await asserts.verifyTextContains(elements.successMessage, 'home');
    await asserts.verifyTextContains(elements.successMessage, 'desktop');
    await asserts.verifyTextContains(elements.successMessage, 'documents');
    await asserts.verifyTextContains(elements.successMessage, 'downloads'); 
    await elements.getCheckBoxResult();
  });
});

test.describe('DemoQA radio button  Tests', () => {
  test('Verify radio button selections', async ({ page }) => {
    const home = new HomePage(page);
    const elements = new ElementsPage(page);
    const asserts = new Assertions();

    await asserts.verifyElementEnabled(elements.yesRadioButton);
    await elements.selectYesRadioButton();
    await asserts.verifyTextContains(elements.youHaveSelectedMessage, 'Yes');
    await asserts.verifyElementDisabled(elements.noRadioButton);
    await asserts.verifyElementEnabled(elements.impressiveRadioButton);
    await asserts.verifyTextContains(elements.youHaveSelectedMessage, 'Impressive');
    await elements.selectImpressiveRadioButton();

  });
});
  test.describe('DemoQA web table  Tests', () => {
    test.only('Add new record and verify in table', async ({ page }) => {
      const home = new HomePage(page);
      const elements = new ElementsPage(page);
      const asserts = new Assertions();

      await home.navigateTo(testData.baseUrl);
      await home.goToElements();
      await elements.openWebTable();
      await elements.deleteButton.click();
      await asserts.verifyElementVisible(elements.noRowsFoundMessage);
      await elements.addNewRecord('John', 'Doe', 'email@gmaill.com', 30, 50000, 'Engineering');
      await asserts.verifyTextContains(elements.tableRows, 'John');
      await asserts.verifyTextContains(elements.tableRows, 'Doe');
      await asserts.verifyTextContains(elements.tableRows, 'email@gmaill.com');
      await asserts.verifyTextContains(elements.tableRows, '30');
      await asserts.verifyTextContains(elements.tableRows, '50000');
      await asserts.verifyTextContains(elements.tableRows, 'Engineering');
      await asserts.verifyElementEnabled(elements.submitButton);
      await asserts.verifyElementVisible(elements.editButton);
      await elements.editButton.click();
      await elements.firstNameInput.fill('Jane');
      await elements.submitButton.click();
      await asserts.verifyTextContains(elements.tableRows, 'Jane');
      await elements.searchBox.fill('Jane');
    });
});