import { test, expect } from '@playwright/test';

test('Pricing navbar link redirects to pricing page', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  const pricingLink = page.getByRole('link', { name: 'Pricing' });
  await pricingLink.click();
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL('https://s4e.io/pricing');
});
