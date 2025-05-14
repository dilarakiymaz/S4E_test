import { test, expect } from '@playwright/test';

test('Reject All cookies closes the banner', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const rejectButton = page.getByRole('button', { name: /reject all/i });

  await rejectButton.click();

  await expect(rejectButton).not.toBeVisible();
});