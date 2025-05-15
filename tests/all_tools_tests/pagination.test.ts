import { test, expect } from '@playwright/test';

test('Pagination changes tool list page', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  // Pagination butonuna tıkla
  const nextButton = page.getByRole('button', { name: 'Go to next page' });
  await expect(nextButton).toBeVisible();
  await nextButton.click();

  // URL'de ?page=1 olmalı (ilk sayfadan sonraki)
  await expect(page).toHaveURL(/page=1/);
});
