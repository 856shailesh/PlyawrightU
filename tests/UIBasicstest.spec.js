const { test, expect } = require('@playwright/test');

test('Page playwright test', async ({ page }) => {
  const userName = page.locator('#username');
  const password = page.locator('#password');
  const signIn = page.locator('input#signInBtn');
  const cardTitle = page.locator('.card-body a');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
  //locator
  await userName.fill('rahulshettyacademy');
  await password.fill('learning');
  await signIn.click();

  //NewPage
  const output = await cardTitle.first().textContent();
  console.log(output);
  const allTitles = await cardTitle.allTextContents();
  console.log(allTitles);
});

test('UI Controls', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const userName = page.locator('#username');
  const password = page.locator('#password');
  const signIn = page.locator('#signInBtn');
  const dropdown = page.locator('select.form-control');
  await dropdown.selectOption('consult');
  await page.locator("//span[@class='radiotextsty']").last().click();
  await page.locator('#okayBtn').click();
  //assertion
  expect(
    await page.locator("//span[@class='radiotextsty']").last()
  ).toBeChecked();
  //await page.pause();
  await page.locator('#terms').click();
  expect(await page.locator('#terms')).toBeChecked();
});
