import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../main/pages/homePage';
import { ElementsPage } from '../main/pages/elementsPage';
import { Assertions } from '../main/helpers/assertions';
import { testData } from '../main/helpers/testData';

test.describe('DemoQA elements page Tests', () => {

  test('Fill text box and verify results', async ({ page }) => {
    const home = new HomePage(page);
    const elements = new ElementsPage(page);
    const asserts = new Assertions();

    await home.navigateTo(testData.baseUrl);
    await home.goToElements();
    await elements.fillTextBox(
      testData.user.name, 
      testData.user.email, 
      testData.user.currentAddress, 
      testData.user.permanentAddress
    );
    await asserts.verifyTextContains(elements.outputBox, testData.user.name);
    await asserts.verifyTextContains(elements.outputBox, testData.user.email);
    await asserts.verifyTextContains(elements.outputBox, testData.user.currentAddress);
    await asserts.verifyTextContains(elements.outputBox, testData.user.permanentAddress);
  });



  test('Check checkboxes and verify results', async ({ page }) => {
    const home = new HomePage(page);
    const elements = new ElementsPage(page);
    const asserts = new Assertions();

    await home.navigateTo(testData.baseUrl);
    await home.goToElements();
    await elements.checkHomeCheckbox();
    await elements.collapseAllButton.click();
  });


  
    /*test('Verify radio button selections', async ({ page }) => {
      const home = new HomePage(page);
      const elements = new ElementsPage(page);
      const asserts = new Assertions();

      await home.navigateTo(testData.baseUrl);
      await home.goToElements();
      await elements.openRadioButtonSection();

      await asserts.verifyElementEnabled(elements.yesRadioButton);
      await elements.selectYesRadio();
      await expect(elements.youHaveSelectedMessage).toBeVisible({ timeout: 3000 });
      await asserts.verifyTextContains(elements.youHaveSelectedMessage, 'Yes');
      await asserts.verifyElementDisabled(elements.noRadioButton);
      await asserts.verifyElementEnabled(elements.impressiveRadioButton);

      await elements.selectImpressiveRadio();
      await asserts.verifyTextContains(elements.youHaveSelectedMessage, 'Impressive');
    }); */
  



  test('Add new record and verify in table', async ({ page }) => {
    const home = new HomePage(page);
    const elements = new ElementsPage(page);
    const asserts = new Assertions();

    await home.navigateTo(testData.baseUrl);
    await home.goToElements();
    await elements.openWebTable();
    

    await elements.deleteAllRows(); 
     await page.waitForTimeout(500);
    
    await asserts.verifyElementVisible(elements.noRowsFoundMessage);
    
    await elements.addNewRecord('John', 'Doe', 'email@gmail.com', 30, 50000, 'Engineering');
    await page.waitForTimeout(500);
    // await asserts.verifyTextContains(elements.tableRows, 'John');
    // await asserts.verifyTextContains(elements.tableRows, 'Doe');
    // await asserts.verifyTextContains(elements.tableRows, 'email@gmail.com');
    // await asserts.verifyTextContains(elements.tableRows, '30');
    // await asserts.verifyTextContains(elements.tableRows, '50000');
    // await asserts.verifyTextContains(elements.tableRows, 'Engineering');
    
    await asserts.verifyElementVisible(elements.editButton);
    await elements.editButton.first().click();
    await elements.firstNameInput.clear();
    await elements.firstNameInput.fill('Jane');
    await elements.submitButton.click();
   // await asserts.verifyTextContains(elements.tableRows, 'Jane');
    
    await elements.searchBox.fill('Jane');
   // await asserts.verifyTextContains(elements.tableRows, 'Jane');
   
    
  });



  
  test.only('click buttons in elements page', async ({ page }) => {
    const home = new HomePage(page);
    const elements = new ElementsPage(page);
    const asserts = new Assertions();
  
    await home.navigateTo(testData.baseUrl);
    await home.goToElements();
    await elements.buttonsMenu.click();
  
    await elements.performDoubleClick();
    await expect(elements.doubleClickMessage).toBeVisible({ timeout: 3000 });
    const doubleClickMsg = await elements.getDoubleClickMessage();
    expect(doubleClickMsg).toContain('double click');

    // Test right click
    await elements.performRightClick();
    await expect(elements.rightClickMessage).toBeVisible({ timeout: 3000 });
    const rightClickMsg = await elements.getRightClickMessage();
    expect(rightClickMsg).toContain('right click');

    // Test dynamic click
    await elements.performDynamicClick();
    await expect(elements.dynamicClickMessage).toBeVisible({ timeout: 3000 });
    const dynamicClickMsg = await elements.getDynamicClickMessage();
    expect(dynamicClickMsg).toContain('dynamic click');

    // Verify all three messages are visible simultaneously
    await asserts.verifyElementVisible(elements.doubleClickMessage);
    await asserts.verifyElementVisible(elements.rightClickMessage);
    await asserts.verifyElementVisible(elements.dynamicClickMessage);
  });



  test('Verify link navigation and responses', async ({ page }) => {
    const home = new HomePage(page);
    const elements = new ElementsPage(page);
    const asserts = new Assertions();

    await home.navigateTo(testData.baseUrl);
    await home.goToElements();
    await elements.linksMenu.click();

    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      elements.homeLink.click()
    ]);
    await newPage.waitForLoadState();
    await asserts.verifyRedirectedUrl('https://demoqa.com/', newPage.url());
    await newPage.close();
    await page.bringToFront();

    await elements.createdLink.click();
    await page.waitForTimeout(1000); // wait for response
    await asserts.verifyResponseContains(201, 'Created');
   

    await elements.noContentLink.click();
    await page.waitForTimeout(1000); // wait for response
    await asserts.verifyResponseContains(204,   'No Content');
  
    await elements.movedLink.click();
    await page.waitForTimeout(1000); // wait for response
    await asserts.verifyResponseContains(301, 'Moved Permanently');

    await elements.badRequestLink.click();
    await page.waitForTimeout(1000);
    await asserts.verifyResponseContains(400, 'Bad Request');

    await elements.unauthorizedLink.click();
    await page.waitForTimeout(1000);
    await asserts.verifyResponseContains(401, 'Unauthorized');

    await elements.forbiddenLink.click();
    await page.waitForTimeout(1000);
    await asserts.verifyResponseContains(403, 'Forbidden');

    await elements.notFoundLink.click();
    await page.waitForTimeout(1000);
    await asserts.verifyResponseContains(404, 'Not Found');
  });

});

