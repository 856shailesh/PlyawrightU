const { test, expect } = require('@playwright/test');

test.only('Calendar Validation', async ({ page }) => {
  const monthNumber = '6';
  const day = '8';
  const year = '1992';

  page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
  await page.locator('div.react-date-picker__wrapper').click();
  await page
    .locator('span.react-calendar__navigation__label__labelText')
    .click();
  await page
    .locator('span.react-calendar__navigation__label__labelText')
    .click();
  await page.pause();
});
