const {test, expect} = require("@playwright/test") //reuse login & logout workfow in other js files

//import login function from loginHelper.js
const {login} = require("./loginHelper");
const {logout} = require("./logoutHelper");

//If to set browser screen size for specific file/test
//test.use({viewport:{width:1366,height:768}})

test.describe.serial('auth flow', () => {
  test('login page', async ({ page }) => {
     await login(page);
  });

  test('logout page', async ({ page }) => {
    // ensure we're logged in for the logout test
    await login(page);
    await logout(page);
    //await expect(page).toHaveURL(/Login/);
  });
});


