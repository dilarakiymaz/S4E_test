import { test, expect } from '@playwright/test';

test('Search - Clear button appears and works', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  // Input'a yaz
  const searchInput = page.getByPlaceholder('Search tools name');
  await searchInput.fill('firewall');

  // Clear butonu görünür olmalı
  const clearButton = page.getByRole('button', { name: 'Clear' });
  await expect(clearButton).toBeVisible();

  // Clear butonuna tıklanınca input temizlenmeli
  await clearButton.click();
  await expect(searchInput).toHaveValue('');
});
