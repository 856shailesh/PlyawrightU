const { test, expect } = require('@playwright/test');

test('Client end to end', async ({ page }) => {
  const email = 'shytest@gmail.com';
  const productName = 'ZARA COAT 3';
  const products = page.locator('.card-body');
  const addtoCartBtn = page.locator('button i[class="fa fa-shopping-cart"]');
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill('Test@123');
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await page.locator('.card-body b').first().waitFor(); // need to wait for element to load even after page loading
  const count = await products.count();
  console.log('Count is ', count);
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator('b').textContent()) === productName) {
      //add the product to cart
      await products.nth(i).locator(addtoCartBtn).click();
      console.log('Added to Cart');
      break; //to break for loop , don't want to iterate more
    }
  }
  const cartBtn = page.locator("[routerlink*='cart']");
  await cartBtn.click();

  const addedCartItems = page.locator('div.cart h3');
  addedCartItems.waitFor(); // wait for these things to load

  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();

  await page.locator("button:has-text('Checkout')").click();

  //Verify for Shipping page to load
  const ShippingInfoText = page.locator('text= Shipping Information ');
  const bool1 = ShippingInfoText.isVisible();
  expect(bool1).toBeTruthy();

  //fill required information
  await page
    .locator("//div[@class='payment__cc']//div[2]//input[1]")
    .fill('123');
  await page
    .locator("//div[@class='payment__cc']//div[3]//input[1]")
    .fill('Shailesh Kumar');
  await page
    .locator("//input[@placeholder='Select Country']")
    .pressSequentially('india');
  await page.locator('//body//app-root//button[2]').click();

  expect(await page.locator("label[type='text']")).toHaveText(email);
  console.log('Email verified');

  await page.locator("//a[normalize-space()='Place Order']").click();
  expect(await page.locator('.hero-primary')).toContainText('Thankyou');

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
