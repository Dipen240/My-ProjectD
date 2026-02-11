const {test, expect} = require("@playwright/test") //reuse login & logout workfow in other js files

//import login function from loginHelper.js
const {login} = require("./loginHelper");
const {logout} = require("./logoutHelper");
const { time } = require("node:console");


test.describe.serial('Homeowner flow', () => {
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
    await expect(page.frameLocator('iframe[name="displayOld"]').getByRole('heading', { name: 'Homeowner Listing' })).toBeVisible({ timeout: 5000 });
  });

    test('logout page', async ({ page }) => {
       await login(page); 
       await logout(page);
    });
});