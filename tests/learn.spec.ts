import {test, expect} from '@playwright/test';

test ('has title', async ({page}) => {
    await page.goto('https://formy-project.herokuapp.com/');
    await expect(page).toHaveURL(/formy/);
});

test ('get started link', async ({page}) => {
    await page.goto('https://formy-project.herokuapp.com/');
    
    await page.getByRole('link', {name: 'Autocomplete'}).click();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/autocomplete/);
});

test ('address locator', async ({page}) => {
    await page.goto('https://formy-project.herokuapp.com/autocomplete');
    const addressInput = await page.getByRole('textbox', { name: 'Address', exact: true });
    const addressInput2 = await page.getByPlaceholder('Street Address 2');
    await addressInput2.fill('Suite 100');
    await addressInput.fill('1600 Amphitheatre Parkway, Mountain View, CA');
    await expect(addressInput).toHaveValue('1600 Amphitheatre Parkway, Mountain View, CA');
    await expect(addressInput2).toHaveValue('Suite 100');
});