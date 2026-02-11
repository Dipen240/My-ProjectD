require('dotenv').config();
const { expect } = require('@playwright/test');

const USER = process.env.LOGIN_USER;
const PASS = process.env.LOGIN_PASS;
if (!USER || !PASS) throw new Error('Set LOGIN_USER and LOGIN_PASS in environment or .env');

async function login(page) {
  const url = 'https://regautomation.cinccaperformance.com/';
  console.log('loginHelper: navigating to', url);
  const resp = await page.goto(url, { waitUntil: 'networkidle' });
  console.log('loginHelper: initial navigation status ->', resp ? resp.status() : 'no-response');

  const userSel = 'id=logIDtxt';
  const passSel = 'id=Password';
  const loginBtn = 'button:has-text("Login")';

  await page.waitForSelector(userSel, { state: 'visible', timeout: 10000 });
  await page.locator(userSel).fill(USER);

  await page.waitForSelector(passSel, { state: 'visible', timeout: 10000 });
  await page.locator(passSel).fill(PASS);

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 }),
    page.locator(loginBtn).click()
  ]);

  await expect(page).toHaveURL(/Home/, { timeout: 10000 });
}

module.exports = { login };
