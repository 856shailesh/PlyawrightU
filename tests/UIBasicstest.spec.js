const { test,expect } = require('@playwright/test');

test('First playwright test', async ({ browser , page }) =>
{   
    //Replaced with page fixture
    //const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto("https://google.com")
});

test.only('Page playwright test', async ({ page }) =>
{   
    await page.goto("https://youtube.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("YouTube");
});