const {test,expect} = require('@playwright/test');

const {login} = require('./loginHelper');
const {logout} = require('./logoutHelper'); 

test.describe.serial('CCR flow', () => {
  test('login page', async ({ page }) => {
     await login(page);
  });

   test('New Violations page', async ({ page }) => {
    await login(page);
      const ccrBtn = page.locator('(//a[@role="button"][normalize-space()="CCR"])[1]');
      await ccrBtn.scrollIntoViewIfNeeded();
      await ccrBtn.hover();
      await page.locator('li[data-menuid="51"]').click();
      await page.waitForTimeout(2000);
      await expect(page.frameLocator('iframe[name="displayOld"]').getByRole('heading', { name: 'New Violations' })).toBeVisible({ timeout: 5000 });
    
  });  

    test('logout page', async ({ page }) => {
       await login(page); 
       await logout(page);
    }); 

}); 