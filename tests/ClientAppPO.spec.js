
import {expect, test} from '@playwright/test';
const {customtest}=require('../utils/test-base');
import { parse } from 'node:path';
import { json } from 'node:stream/consumers';
const {POManager}=require('../pageobjects/POManager')
//converting a testdata json file to js object to access data set insetd of creating a varibale by using json.parse.
//whileconverting our json encoding may fail so to solve this we need to con vert it first to string using stringify
//json to string->js object
const dataSet=JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")));

for(const data of dataSet){
   //use this dollar calibrator so that it evaluates uber expression.If not, it will just read it as a string.


test(`@Webst Client App login for product name ${data.productName}`, async ({ page }) => {
// const username = "anshika@gmail.com";
// const password="Iamking@000"
// const productName = 'ZARA COAT 3';

//const products = page.locator(".card-body");

const poManager=new POManager(page)
const loginPage=poManager.getLoginPage();
await loginPage.goto()
await loginPage.validLogin(data.username,data.password)
const dashboardPage=poManager.getDashboardPage();
await dashboardPage.serachProductAddCart(data.productName)
await dashboardPage.navigateToCart()
const checkoutPage=poManager.getCheckoutPage()
await checkoutPage.waitForProductVisibility(data.productName).first().waitFor();
await expect(
    checkoutPage.waitForProductVisibility(data.productName).first()
).toBeVisible();
await checkoutPage.navigateToCheckout()

   
 
  await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
    //added 3 equals two sign when we match with string
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
    expect(page.locator(".user__name [type='text']").first()).toHaveText(dataSet.username);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 


});
}
customtest.only(`@Webtestst Client App login test using fixture`, async ({ page,testDataForOrder}) => {
// const username = "anshika@gmail.com";
// const password="Iamking@000"
// const productName = 'ZARA COAT 3';

//const products = page.locator(".card-body");

const poManager=new POManager(page)
const loginPage=poManager.getLoginPage();
await loginPage.goto()
await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password)
const dashboardPage=poManager.getDashboardPage();
await dashboardPage.serachProductAddCart(testDataForOrder.productName)
await dashboardPage.navigateToCart()
const checkoutPage=poManager.getCheckoutPage()
await checkoutPage.waitForProductVisibility(testDataForOrder.productName).first().waitFor();
await expect(
    checkoutPage.waitForProductVisibility(testDataForOrder.productName).first()
).toBeVisible();
await checkoutPage.navigateToCheckout()

});
