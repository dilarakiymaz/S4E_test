import { test, expect } from '@playwright/test';

test('Latest updates section shows exactly 4 update cards', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Yalnızca başlık satırlarını (ilk <tr>) seç
  const updateTitleRows = page.locator('tbody.MuiTableBody-root > tr:nth-of-type(2n-1)');
  await expect(updateTitleRows).toHaveCount(4);
});
