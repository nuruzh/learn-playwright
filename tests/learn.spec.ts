import {test, expect} from '@playwright/test';

test ('has title', async ({page}) => {
    await page.goto('https://formy-project.herokuapp.com/');
    await expect(page).toHaveURL(/formy/);
});

test ('get started link', async ({page}) => {
    await page.goto('https://formy-project.herokuapp.com/');
    
    await page.locator('[href="/autocomplete"]').nth(1).click();

    await expect(page).toHaveURL(/autocomplete/);
});