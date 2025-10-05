const { test, expect } = require('@playwright/test');

test('Popup Validations', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  //   await page.goto('https://www.google.com/');
  //   await page.goBack();
  //   await page.pause();
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.locator('#hide-textbox').click();
  await expect(page.locator('#displayed-text')).toBeHidden();
  await page.locator('#confirmbtn').click();
  page.on('dialog', (dialog) => dialog.accept());
  await page.locator('#mousehover').hover();

  const frame = page.frameLocator('#courses-iframe');
  await frame.locator('ul.navigation li').nth(1).click();
  console.log('End of Script');
  await page.pause();
});

test('Screenshot & Visual Comparisons', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.locator('#displayed-text').screenshot({ path: 'partialSS.png' });
  await page.locator('#hide-textbox').click();
  await page.screenshot({ path: 'screenshot.png' });
  await expect(page.locator('#displayed-text')).toBeHidden();
});

//Screenshot to screenshot comparison
test.only('Visual Comparisons', async ({ page }) => {
  await page.goto('https://google.com/');
  expect(await page.screenshot()).toMatchSnapshot('landing.png');
});
