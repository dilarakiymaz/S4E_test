import { test, expect } from '@playwright/test';

test('Category dropdown updates URL correctly for each option', async ({ page }) => {
  const categories = [
    { label: 'DNS Controls', value: 'dns-controls' },
    { label: 'SSL Controls', value: 'ssl-controls' },
    { label: 'Misconfiguration', value: 'misconfiguration' },
    { label: 'Network Vulnerabilities', value: 'network-vulnerabilities' },
    { label: 'Web Vulnerabilities', value: 'web-vulnerabilities' },
    { label: 'Information Scans', value: 'information-scans' },
    { label: 'Product Based Web Vulnerabilities', value: 'product-based-web-vulnerabilities' },
    { label: 'Product Based Network Vulnerabilities', value: 'product-based-network-vulnerabilities' }
  ];

  for (const category of categories) {
    await page.goto('https://s4e.io/free-security-tools');

    // Aç dropdown'ı
    const dropdown = page.getByRole('button', { name: 'Category' });
    await dropdown.click();

    // Seçenek tıkla
    await page.getByText(category.label, { exact: true }).click();

    // URL doğru şekilde güncellenmiş mi?
    await expect(page).toHaveURL(new RegExp(`tools-category=${category.value}`));
  }
});
