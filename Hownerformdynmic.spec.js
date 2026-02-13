const{test,expect} = require('@playwright/test');{

const {login} = require('./loginHelper');
const {logout} = require('./logoutHelper');
const { validateHeaderValue } = require('node:http');

test.describe.serial('Homeowner Listing form', () => {
  test('login page', async ({ page }) => {
     await login(page);
  });

test('Homeowner page', async ({ page }) => {
    await login(page);

const homeownersBtn = page.locator('(//a[@role="button"][normalize-space()="Homeowners"])[1]');
await homeownersBtn.scrollIntoViewIfNeeded();
await homeownersBtn.hover();
await page.locator('(//a[@class="addtocontextmenu"][normalize-space()="Homeowners"])[2]').click();
await page.waitForTimeout(2000);
// The 'Homeowner Listing' heading is inside the iframe named 'displayOld'
await page.waitForSelector('iframe[name="displayOld"]');
await expect(page.frameLocator('iframe[name="displayOld"]').getByRole('heading', { name: 'Homeowner Listing' })).toBeVisible();

//Homeowner New button steps           
await page.frameLocator('iframe[name="displayOld"]').locator('#btnNew').click();
await expect(page.frameLocator('iframe[name="displayOld"]').getByRole('heading', { name: 'Primary Homeowner Information' })).toBeVisible({ timeout: 15000 }); 

await page.frameLocator('iframe[name="displayOld"]').locator('select[id="numPropertyStatusID"]').selectOption('17');


});   

    test('logout page', async ({ page }) => {
       await login(page); 
       await logout(page);

    });
});
}