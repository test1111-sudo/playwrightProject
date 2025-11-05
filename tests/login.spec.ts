import {test, expect} from '@playwright/test';
import ManagePage from '../pages/ManagePage.js';

test.describe('Login Tests', () => {
    let mp: ManagePage;

    test.beforeEach(({page}) => {
        mp = new ManagePage(page);
    });

    test('Successful Login', async () => {
        await mp.loginPage.openLoginPage();
        await mp.loginPage.userLogin('tomsmith', 'SuperSecretPassword!');
        await mp.securePage.assertSuccess();
    });
});