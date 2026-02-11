const { expect } = require('@playwright/test');

async function logout(page) {
   console.log('logoutHelper: starting logout');
   if (page.isClosed && page.isClosed()) {
     console.log('logoutHelper: page is already closed');
     throw new Error('Page closed before logout');
   }

  // Prefer direct logout link (anchor) if present
  try {
    const directLogout = page.locator('a[href*="LogOffFromASP"]');
    const count = await directLogout.count();
    if (count > 0) {
      const first = directLogout.first();
      if (await first.isVisible()) {
        await first.click({ timeout: 5000 });
        await expect(page).toHaveURL(/Login/);
        console.log('logoutHelper: clicked direct logout link');
        return;
      }
      // Anchor present but not visible in the DOM (maybe inside a hidden menu).
      // Try to navigate directly to its href as a fallback.
      const href = await first.getAttribute('href');
      if (href) {
        const target = new URL(href, page.url()).toString();
        console.log('logoutHelper: direct anchor present but hidden, navigating to', target);
        await page.goto(target, { waitUntil: 'networkidle' });
        await expect(page).toHaveURL(/Login/);
        console.log('logoutHelper: logged out via direct anchor navigation');
        return;
      }
    }
  } catch (e) {
    console.log('logoutHelper: direct logout link attempt failed:', e.message);
  }

  // Fallback: click File menu button then Logout — use getByRole to avoid ambiguity
  try {
    const fileButton = page.getByRole('button', { name: 'File' }).first();
    if (await fileButton.count() > 0) {
      await fileButton.hover();
      await fileButton.getByText('Logout').first().click();
      await expect(page).toHaveURL(/Login/);
      console.log('logoutHelper: clicked Logout via File menu');
      return;
    }
  } catch (e) {
    console.log('logoutHelper: File menu logout attempt failed:', e.message);
  }
  // Final fallback: navigate directly to known logout path if available on page
  try {
    const logoutAnchor = page.locator('a:has-text("Logout")').first();
    const href = await logoutAnchor.getAttribute('href');
    if (href) {
      const target = new URL(href, page.url()).toString();
      console.log('logoutHelper: navigating directly to', target);
      await page.goto(target, { waitUntil: 'networkidle' });
      await expect(page).toHaveURL(/Login/);
      console.log('logoutHelper: logged out via direct navigation');
      return;
    }
  } catch (e) {
    console.log('logoutHelper: direct navigation fallback failed:', e.message);
  }

  throw new Error('Could not find Logout or File menu — update selectors in logoutHelper.js');
}

module.exports = { logout };