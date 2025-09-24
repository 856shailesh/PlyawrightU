const { test, expect } = require('@playwright/test');

test.only('Client end to end', async ({ page }) => {
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
  //await page.pause();
  //const titles = await page.locator('.card-body b').allTextContents();
  //console.log(titles);
  // await page.locator().click();
});
