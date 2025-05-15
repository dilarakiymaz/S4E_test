import { test, expect } from '@playwright/test';

test('Asset Type dropdown updates URL correctly for each option', async ({ page }) => {
  const assetTypes = [
    { label: 'Domain', value: 'domain' },
    { label: 'IPv4', value: 'ipv4' },
    { label: 'Email', value: 'email' },
    { label: 'URL', value: 'url' },
    { label: 'Request', value: 'request' },
  ];

  for (const asset of assetTypes) {
    await page.goto('https://s4e.io/free-security-tools');

    // Asset Type dropdown'ı aç
    const dropdown = page.getByRole('button', { name: 'Asset Type' });
    await dropdown.click();

    // İlgili seçeneği tıkla
    await page.getByText(asset.label, { exact: true }).click();

    // URL asset_type=... ile güncellenmiş mi kontrol et
    await expect(page).toHaveURL(new RegExp(`asset_type=${asset.value}`));
  }
});
