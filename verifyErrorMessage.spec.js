const {test, expect} = require('@playwright/test')

test("Verify Error Message", async function({page})

{

await page.goto("https://regautomation.cinccaperformance.com/")

await page.locator("(//input[@id='logIDtxt'])[1]").type("autoRegA")
await page.locator("(//input[@id='Password'])[1]").type("St@rtingLin12")

await page.locator("(//button[normalize-space()='Login'])[1]").click()

const errorMessage= await page.locator("(//div[@role='alert'])[1]").allTextContents()

console.log("Error message is"+errorMessage);

//if validate or match Partial message

//expect (errorMessage.includes("You have entered invalid credentials")).toBeTruthy()

//if validate or match compete/exact error message

//expect (errorMessage==="You have entered invalid credentials. Please verify your information and try again").toBeTruthy()

})