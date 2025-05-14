import { test, expect } from '@playwright/test';

test('Login button redirects to login page', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  const loginButton = page.getByRole('button', { name: 'Login' });
  await loginButton.click();

  await page.waitForLoadState('load');  
  await expect(page).toHaveURL('https://app.s4e.io/sign-in');
});
