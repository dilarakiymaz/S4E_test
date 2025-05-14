import { test, expect } from '@playwright/test';

test('Accept All cookies closes the banner', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');
  const acceptButton = page.getByRole('button', { name: /accept all/i });
  await acceptButton.click();
  await expect(acceptButton).not.toBeVisible();
});
