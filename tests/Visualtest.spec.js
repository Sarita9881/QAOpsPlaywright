import {expect, test, title} from '@playwright/test';


test("Visual Testing",async({page})=>
  {

await page.goto("https://www.google.com/");
expect(await page.screenshot()).toMatchSnapshot('visualtest.png');

//expect(await page.screenshot()).toMatchSnapshot('landing-page.png');
})


