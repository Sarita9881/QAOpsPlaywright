const { When, Then,Given } = require('@cucumber/cucumber');
const {POManager}=require('../../pageobjects/POManager')
const {expect } = require('@playwright/test');
const playwright=require ('@playwright/test');


Given('Login to Ecommerce application with {string} and {string}', {timeout:100*1000}, async function (username, password) {

//const products = this.page.locator(".card-body");
const loginPage=this.poManager.getLoginPage();
await loginPage.goto()
await loginPage.validLogin(username,password)
});

When('Add {string} to cart', async function (productName) {
this.dashboardPage=this.poManager.getDashboardPage();
await this.dashboardPage.serachProductAddCart(productName)
await this.dashboardPage.navigateToCart()
});

/*Then('verify {string} is displayed in the cart', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('Enter valid details and place the order', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('verify order is present in the order history', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});*/

Given('Login to Ecommerce2 application with wrong cred {string} and {string}', async function (username, password) {
  
  const userName=this.page.locator('#username');
    const signIn=this.page.locator('#signInBtn');
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //css xpath selectors
    //await page.locator('#username').fill('testing');
    await userName.fill(username);
    await this.page.locator("[type='password']").fill(password);
   // await page.locator('#signInBtn').click();
   await signIn.click();
    });

Then('Verify Error message is displyed', async function () {
  console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect username/password');

});
