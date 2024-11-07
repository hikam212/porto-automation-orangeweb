import { test, expect } from '@playwright/test';

test('Login', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  const isDashboardVisible = await page.getByRole('heading', { name: 'Dashboard' }).isVisible();

  console.log('Telah masuk ke halaman Dashboard', isDashboardVisible);
});
