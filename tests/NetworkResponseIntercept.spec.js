import { test, expect, request } from '@playwright/test';
//import { APiUtils } from '../utils/APiUtils';
import { APiUtils } from "../utils/APiUtils.spec";
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };
 
let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
 
})
 
 
//create order is success
test('@SP Place the order', async ({ page }) => {
  page.addInitScript(value => {
 
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
 
 //page.route means re route the given url as we required,first argureme-URL -which we want to route
 //first which URl want to route,secound aregument is funtiont hat telss how you want to route
  /*Do you remember that?So when I say intercepting response API will give back the response and that response we will send it
to browser and using that response browser will render the data on front end. 
  
  
  */await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {

        //Page dot request means we are turning our page mode to the API mode.
        //fetch method used to fetch the response (here that is available in route )
        //his route have so many properties, so we need to say like this route dot request.
      const response = await page.request.fetch(route.request());

      //converting that JavaScript object/payload into Json object using stringify method.


      let body = JSON.stringify(fakePayLoadOrders);
      /*Now we are rooting it right before you get back the response.

We actually doing some modification here and fulfilling that root, fulfilling that root means fulfilling
that call on the browser.Okay.So when you are fulfilling, that means you are sending that response to browser fulfill method.
What it does, it will send response to back to browser.
      
--for fulfill method we need to send lot of info body,contetnt type,headers,Okay,
 so if you don't send anything by default, whatever route have it will give it.
But if you are explicitly sending something that means body so it will overwrite the existing body.
      */
      route.fulfill(
        {
          response,
          body, 
 
        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });
 
  await page.locator("button[routerlink*='myorders']").click();
  //waits until the rsponse is received from the specified URL
  //wildcard * at the url means accept any value here/order id here.So 
  // that means we are telling playwright accept anything here.it will be generic not for specidfic order id.


  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
 
  console.log(await page.locator(".mt-4").textContent());
 
 
 
});