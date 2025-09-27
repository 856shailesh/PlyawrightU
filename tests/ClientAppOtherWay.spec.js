const { test, expect } = require('@playwright/test');

test.only('Client end to end', async ({ page }) => {
  //js file- Login js, DashboardPage
  const email = 'anshika@gmail.com';
  const productName = 'ZARA COAT 3';
  const products = page.locator('.card-body');
  await page.goto('https://rahulshettyacademy.com/client');
  await page.getByPlaceholder('email@example.com').fill(email);
  await page.getByPlaceholder('enter your passsword').fill('Iamking@000');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');
  await page.locator('.card-body b').first().waitFor();

  await page
    .locator('.card-body')
    .filter({ hasText: 'ZARA COAT 3' })
    .getByRole('button', { name: 'Add to Cart' })
    .click();

  await page
    .getByRole('listitem')
    .getByRole('button', { name: 'Cart' })
    .click();

  //await page.pause();
  await page.locator('div li').first().waitFor();
  await expect(page.getByText('ZARA COAT 3')).toBeVisible();

  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByPlaceholder('Select Country').pressSequentially('ind');

  await page.getByRole('button', { name: 'India' }).nth(1).click();
  await page.getByText('PLACE ORDER').click();

  await expect(page.getByText('Thankyou for the order.')).toBeVisible();

  //Grab order ID from Confirmation page
  const orderID = await page
    .locator('tr.ng-star-inserted td label')
    .textContent();
  const cleanOrderID = orderID.replace(/\|/g, '').trim();
  console.log('Order ID is', cleanOrderID);

  await page
    .locator(".btn.btn-custom[routerlink='/dashboard/myorders']")
    .click();

  await page.locator('tbody').waitFor();
  const allOrders = await page
    .locator('table.table tbody tr th')
    .allTextContents();
  console.log('All orders', allOrders);

  for (let i = 0; i <= allOrders.length; i++) {
    if (allOrders.includes(cleanOrderID)) {
      const viewBtn = await page
        .locator("(//button[contains(text(),'View')])")
        .nth(i);
      viewBtn.click();
      console.log(
        'Clicked on View Order from history with order ID',
        cleanOrderID
      );
      break;
    }
  }

  const orderSummaryID = await page.locator('.col-text').textContent();
  expect(orderID.includes(orderSummaryID)).toBeTruthy();
  console.log('order id verified on summary page');

  console.log('End of script');
});
