import { test, expect } from '@playwright/test';

test('Cookie banner does not appear on second visit after accepting', async ({ page, context }) => {
  await page.goto('https://s4e.io/free-security-tools');

  // Accept All once
  const acceptButton = page.getByRole('button', { name: /accept all/i });
  await acceptButton.click();
  await expect(acceptButton).not.toBeVisible();

  // Yeni sekme aç (aynı session)
  const page2 = await context.newPage();
  await page2.goto('https://s4e.io/free-security-tools');

  // Tekrar açıldı mı?
  const banner = page2.getByRole('button', { name: /accept all/i });
  await expect(banner).toBeHidden(); // veya not.toBeVisible();
});
