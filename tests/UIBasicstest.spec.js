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
  const documentLink = page.locator("[href*='documents-request']");
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
  await expect(documentLink).toHaveAttribute('class', 'blinkingText');
});

test('@Child windows hadl', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator('#username');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent('page'), //listen for any new page pending,rejected,fulfilled
    documentLink.click(),
  ]); //new page is opened
  const text = await newPage.locator('.red').textContent();
  console.log(text);
  const arrayText = text.split('@');
  const domain = arrayText[1].split(' ')[0];
  console.log(domain);
  await page.locator('#username11').fill(domain);
});
