

const {POManager}=require('../../pageobjects/POManager')
const playwright=require ('@playwright/test');
const { Before, After,BeforeStep,AfterStep,BeforeAll,AfterAll,Status } = require('@cucumber/cucumber');



Before({tags: "@Smoke"},async function () {

const browser=await playwright.chromium.launch({headless:false});
  const context=await browser.newContext();
  this.page=await context.newPage();
 this.poManager=new POManager(this.page)
 
});

AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
await this.page.screenshot({path:'scrrenshot1.png'})
}
});

BeforeStep(function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});


After(function()
{

console.log("at the end to execute test")
});