import { test, expect } from '@playwright/test';

test('Clicking Start Trial navigates to sign-up page', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const startTrial = page.locator('a:has-text("Start trial")');
  await expect(startTrial).toBeVisible();
  await startTrial.click();

  await expect(page).toHaveURL('https://app.s4e.io/sign-up');
});
