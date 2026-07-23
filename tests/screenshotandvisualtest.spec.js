import {expect, test, title} from '@playwright/test';


test("screenshot and visual comparisons",async({page})=>
  {

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

/*await page.goto("https://www.google.com/");
await page.goBack();
await page.goForward();
*/
await expect (page.locator("#displayed-text")).toBeVisible();
await page.locator("#displayed-text").screenshot({path:'partialscreenshot.png'});

await page.locator("#hide-textbox").click();
await page.screenshot({path:'screenshot.png'});
await expect (page.locator("#displayed-text")).toBeHidden();
/*await page.pause();
await page.on('dialog',dialog=>dialog.accept());
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();
const framepages=page.frameLocator("#courses-iframe");
await framepages.locator("li a[href*='lifetime-access']:visible").click();
const textcheck=await framepages.locator(".text h2").textContent();
console.log(textcheck.split(" ")[1]);
*/
})


