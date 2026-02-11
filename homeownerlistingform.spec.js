const{test,expect}=require('@playwright/test');

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
    
    //Fill out the form fields in the 'Primary Homeowner Information' section
    //status
    //await page.frameLocator('iframe[name="displayOld"]').locator('#numPropertyStatusID').click();
    await page.frameLocator('iframe[name="displayOld"]').locator('select[id="numPropertyStatusID"]').selectOption('17'); 
    


    //Fill out collection satus dropdown
    //await page.frameLocator('iframe[name="displayOld"]').locator('#numCollectionLevelID').click();
    await page.frameLocator('iframe[name="displayOld"]').locator('select[id="numCollectionLevelID"] option[value="35"]');
    //Fill out Hold Collection dropdown
    //await page.frameLocator('iframe[name="displayOld"]').locator('#numHoldCollections').click();
    await page.frameLocator('iframe[name="displayOld"]').locator('select[id="numHoldCollections"] option[value="2"]');
    //Fill out Account#
    await page.frameLocator('iframe[name="displayOld"]').locator('#entryDescrtxtPropertyHOID').fill('7403');

     //Fill out Owner#
    await page.frameLocator('iframe[name="displayOld"]').locator('#numOwnerNo').fill('27');


    //Fill out Owner 1 (First/Last )
    await page.frameLocator('iframe[name="displayOld"]').locator('#entryDescrtxtPropertyName').fill('Abcclast');

    //Fill out Address1
     await page.frameLocator('iframe[name="displayOld"]').locator('#entryDescrtxtPropertyAddress1').fill('123 Main Street');
     await page.frameLocator('iframe[name="displayOld"]').locator('#entryDescrtxtPropertyCity').fill('New York');
     //await page.frameLocator('iframe[name="displayOld"]').locator('#txtPropertyState').click();
     await page.frameLocator('iframe[name="displayOld"]').locator('select[id="txtPropertyState"] option[value="45"]');
     await page.frameLocator('iframe[name="displayOld"]').locator('#zipPropertyZip').fill('90206');
     await page.frameLocator('iframe[name="displayOld"]').locator('#entryDescrtxtUnitNo').fill('15');
     await page.frameLocator('iframe[name="displayOld"]').locator('#entryDescrtxtLotNo').fill('24');

     //click on save button.
   
     await page.frameLocator('iframe[name="displayOld"]').locator('#btnSave').click();    

     
  });   
  

    test('logout page', async ({ page }) => {
       await login(page); 
       await logout(page);

    });

});