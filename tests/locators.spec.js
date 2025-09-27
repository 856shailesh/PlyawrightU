import { test, expect } from '@playwright/test';

test('playwright Special locators', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  // await page.getByLabel('Check me out if you Love IceCreams!').click();
  // await page.getByLabel('Gender').selectOption('Female');
  // await page.getByPlaceholder('Password').fill('TEst@123');

  await page.getByLabel('Name').fill('Test');
  page.pause();
  console.log('End of Script');
});
