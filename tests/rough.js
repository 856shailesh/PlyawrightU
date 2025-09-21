const { test, chromium } = require('@playwright/test');

test('Browser Context example', async () => {
  const browser = await chromium.launch({ headless: false });

  // Context 1
  const context1 = await browser.newContext();
  const page1 = await context1.newPage();
  await page1.goto('https://amazon.in');

  // Context 2
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  await page2.goto('https://flipkart.com');

  await browser.close();
});
