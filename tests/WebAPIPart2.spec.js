
import {expect, test} from '@playwright/test';
//import path from 'node:path';

let email;
let webContext;
test.beforeAll(async({browser})=>{

    const context=await browser.newContext();
   const  page=await context.newPage();
   email = "anshika@gmail.com";

    await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await context.storageState({path:'state.json'});
//here at below line we are creating new browser context as we did befor but this time we are injecting existing storage data
//So that means the new browser want it, open it, have knowledge about all the tokens, what it needs
//to behave like a logged in user.   
webContext=await browser.newContext({storageState:'state.json'});
   

})

test('@Webst Client App login', async (

) => {
const email = "anshika@gmail.com";
const productName = 'ZARA COAT 3';
//this page is now created dynamically.So we are not passing it as a fixture.
const page=await webContext.newPage();
await page.goto("https://rahulshettyacademy.com/client");

const products = page.locator(".card-body");

   await page.locator(".card-body b").first().waitFor();
   //below locator will return all the element that is 8 with text (product name)
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();//looping through the titles we received & matching which we required to Add to card
   for (let i = 0; i < count; ++i) {
    /*/here matching the received nth index product name with we want to add to card once got adding it to cart.here is concept called chaing locater used 
    we conting find child by using b tage after products.nth(i) not writing complete part again just serching subpart after that*/
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart--below locaator add to cart button is found using text directly
         await products.nth(i).locator("text= Add To Cart").click();
         //breaking for loop once received expected product & added to cart.
         break;
      }
   }
 
//await page.pause();

 await page.locator("[routerlink*='cart']").click();
   //await page.pause();
 
   await page.locator("div li").first().waitFor();
   //One is how to find locator based upon text and with a tag.
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
 
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
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
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