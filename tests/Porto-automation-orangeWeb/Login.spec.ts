import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});

test('get started link', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
await page.getByPlaceholder('Username').fill('Admin');
await page.getByPlaceholder('Password').fill('admin123');
await page.getByRole('button', { name: 'Login' }).click();
const isDashboardVisible = await page.getByRole('heading', { name: 'Dashboard' }).isVisible();

console.log('Telah masuk ke halaman Dashboard', isDashboardVisible);

});

test('Search menu', async ({ page }) => {
  async function searchAndOpenSubmenu(page, Admin, PIM) {
    // Fill in the search input with the menu name
    await page.getByPlaceholder('Search').fill(Admin);
    
    // Click on the main menu item (e.g., "Admin")
    await page.getByRole('menuitem', { name: Admin }).click();
  
    await page.getByPlaceholder('Search').fill(PIM);

    // Wait for the submenu to be visible and then click on it
    await page.getByRole('menuitem', { name: PIM }).click();
    
    // Optionally, verify that the submenu page has loaded
    const isSubmenuVisible = await page.getByText(PIM).isVisible();
    expect(isSubmenuVisible).toBe(true);
  }
});
