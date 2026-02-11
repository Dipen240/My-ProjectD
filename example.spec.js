const {First, except} = require('playwright');

(async () => {

const browser =   await chromium. launch();
const page = await browser.newPage();
//First('homepage has titile', async ({ page }) => {
await page.goto('https://playwright.dev/');
await expect(page).toHaveTitle(/Playwright/);
console.log(await page.titile());
await browser.close();

})();