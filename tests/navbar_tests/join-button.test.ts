import { test, expect } from '@playwright/test';

test('Join button redirects to join page', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  const joinButton = page.getByRole('button', { name: 'Join' });
  await joinButton.click();

  await page.waitForLoadState('load'); 
  await expect(page).toHaveURL('https://app.s4e.io/sign-up');
});
