import { test, expect } from '@playwright/test';

test.describe('Test Fitur Pada Halaman Admin', () => {
    test.beforeEach(async ({ page }) => {
        // Script login menuju halaman Admin
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        // Pastikan dashboard terlihat setelah login
        await page.waitForSelector('h6:has-text("Dashboard")');
        const isDashboardVisible = await page.getByRole('heading', { name: 'Dashboard' }).isVisible();
        expect(isDashboardVisible).toBe(true);
        console.log('Telah masuk ke halaman Dashboard', isDashboardVisible);

        // Menuju halaman Admin
        await page.getByRole('link', { name: 'Admin' }).click();
        await page.waitForSelector('h5:has-text("System Users")');
        const systemusers = await page.getByRole('heading', { name: 'System Users' }).isVisible();
        expect(systemusers).toBe(true);
        console.log('Telah masuk ke halaman user management - user', systemusers);
    });

    // Script mencoba fitur search dan filter
    test('List Admin', async ({ page }) => {
        const searchvalue = 'bobert';
        const employee = 'Bobert Perdolia';

        // Isi kolom pencarian
        await page.getByRole('textbox').nth(1).fill(searchvalue);

        // Klik untuk memilih filter status
        const statusSelect = await page.locator('.oxd-select-text').first();
        await statusSelect.click();
        await page.getByRole('option', { name: 'ESS' }).click();
        await page.getByPlaceholder('Type for hints...').fill(employee);
        await page.getByRole('option', { name: 'Bobert Perdolia' }).click();
        await page.getByText('-- Select --').click();
        await page.getByRole('option', { name: 'Disable' }).click();
        await page.getByRole('button', { name: 'Search' }).click();

        // Reset search dan filter
        await page.getByRole('button', { name: 'Reset' }).click();

        // Validasi bahwa filter telah direset
        const searchBoxValue = await page.getByRole('textbox').nth(1).inputValue();
        expect(searchBoxValue).toBe('');
    });

    // Script membuat data user
    test('Add User', async ({ page }) => {
        const UsernameID = getRandomInt(1,1000)

        await page.getByRole('button', { name: ' Add' }).click();
        await page.waitForSelector('h6:has-text("Add User")');
        const adduserpage = await page.getByRole('heading', { name: 'Add User' }).isVisible();
        expect(adduserpage).toBe(true);
        console.log('Berhasil masuk ke halaman Add User', adduserpage);

        // Pilih role Admin
        await page.locator('.oxd-select-text').first().click();
        await page.getByRole('option', { name: 'Admin' }).click();
        
        // Isi kolom 'Employee Name'
        await page.getByPlaceholder('Type for hints...').fill('AUTOMATE TES TING');
        await page.waitForTimeout(3000);
        await page.getByRole('option', { name: 'AUTOMATE TES TING' }).click();
        
        // Pilih status Enabled
        await page.getByText('-- Select --').click();
        await page.waitForTimeout(3000);
        await page.getByRole('option', { name: 'Enabled' }).click();

        // Isi kolom username dan password
        await page.getByRole('textbox').nth(2).fill('AUTOMATION'+UsernameID);
        await page.getByRole('textbox').nth(3).fill('Admin123');
        await page.getByRole('textbox').nth(4).fill('Admin123');

        // Klik tombol Save
        await page.getByRole('button', { name: 'Save' }).click();
    });
    // Script Edit data
    test('Edit User', async ({ page }) => {
        const UsernameID = getRandomInt(1,1000)

        await page.click('//div[@data-v-f2168256][2]//button[2]')
        await page.waitForSelector('h6:has-text("Edit User")');
        const adduserpage = await page.getByRole('heading', { name: 'Edit User' }).isVisible();
        expect(adduserpage).toBe(true);
        console.log('Berhasil masuk ke halaman Edit User', adduserpage);

        // Pilih role ESS
        await page.locator('.oxd-select-text').first().click();
        await page.getByRole('option', { name: 'ESS' }).click();
        
        // Isi kolom 'Employee Name'
        await page.getByPlaceholder('Type for hints...').fill('Orange Test');
        await page.waitForTimeout(3000);
        await page.getByRole('option', { name: 'Orange Test' }).click();
        
        // Pilih status Disable
        await page.getByText('Enabled').click();
        await page.waitForTimeout(3000);
        await page.getByRole('option', { name: 'Disabled' }).click();

        // Edit kolom username dan password
        await page.getByRole('textbox').nth(2).fill('AUTOMATION'+UsernameID);
        await page.locator('label').filter({ hasText: 'Yes' }).locator('i').click();
        await page.getByRole('textbox').nth(3).fill('Admin123');
        await page.getByRole('textbox').nth(4).fill('Admin123');

        // Klik tombol Save
        await page.getByRole('button', { name: 'Save' }).click();


    })

    // Script delete data user
    test('Delete User', async ({ page }) => {
        const searchdelete = ('AUTOMATION')
        await page.getByRole('textbox').nth(1).fill(searchdelete);
        await page.getByRole('button', { name: 'Search' })
        await page.click('//div[@data-v-f2168256][2]//button[1]');
        await page.getByRole('button', { name: ' Yes, Delete' }).click();
    })
});

// Fungsi untuk menghasilkan angka acak
function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
