import {expect, test, title} from '@playwright/test';
//import { title } from 'node:process';
//test('first test',async function()
//{


//});
test.describe.configure({mode:'parallel'});
test('@Smoke page playwrighr test',async({browser})=>
{
    
    const context=await browser.newContext();
    const page=await context.newPage();
    const userName=page.locator('#username');
    const signIn=page.locator('#signInBtn');
    const cardTitle=page.locator('.card-body a');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //css xpath selectors
    //await page.locator('#username').fill('testing');
    await userName.fill('testing');
    await page.locator("[type='password']").fill('Learning@830$3mK2');
   // await page.locator('#signInBtn').click();
   await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password');
    await userName.fill('');
    await userName.fill('rahulshettyacademy');
   await signIn.click();
   // console.log(await cardTitle.first().textContent());
 //   console.log(await page.locator('.card-body a').nth(1).textContent());
   // console.log(await page.locator('.card-body a').last().textContent());
   //await page.waitForLoadState('networkidle');
   await page.locator('.card-body a').last().waitFor();
   const allCardTittles=await cardTitle.allTextContents();
   console.log(allCardTittles);


    });

test('@Smoket UI Controls',async({page})=>
{
    //await page.goto("https://www.google.com");
    //console.log(await page.title()); 
   //await expect(page).toHaveTitle("Google");   
       await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
       const userName=page.locator('#username');
       const signIn=page.locator('#signInBtn');
       const documentLink=page.locator("[href*='documents-request']");
       const dropdown=page.locator('select.form-control');
       await dropdown.selectOption('consult');

       //radiobuttons
       await page.locator('.radiotextsty').last().click();
       await page.locator('#okayBtn').click();
       
       await expect(page.locator('.radiotextsty').last()).toBeChecked();
       console.log(page.locator('.radiotextsty').last().isChecked());
           //   await page.pause();
        //CheckboxexS
       await page.locator('#terms').click();
       await expect(page.locator('#terms')).toBeChecked();
       await page.locator('#terms').uncheck();
    //assetion to verify is chekbox unchecked 
     expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class','blinkingText');
    
    });

 test('@Smoket Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    //const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
    

});


/*test('Ui Controls',async({page}))=>{
    
    const context=await browser.newContext();
    const page=await context.newPage();
    const userName=page.locator('#username');
    const signIn=page.locator('#signInBtn');
    const cardTitle=page.locator('.card-body a');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});*/