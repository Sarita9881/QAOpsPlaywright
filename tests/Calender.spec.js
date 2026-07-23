const {test,expect} = require("@playwright/test");
 
 
test("Calendar validations",async({page})=>
{
 
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    
    //Date selection
    //in beloe line we want june month to select but array start from 0 index so we did monthnumber-1 &
    //  it is string as we declared so conver it to number used Number function--nth(Number(monthNumber)-1) 
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    //using +date+ in locatore which is xpath locator will replace date varibale value here declared above to make it dynamic avoid  hardcoding
    await page.locator("//abbr[text()='"+date+"']").click();
 
    //selected date verification /assertion
    const inputs =  page.locator('.react-date-picker__inputGroup__input')//will check all 3 values coming from thic locator 6,15,2027
    console.log("-------------------------"+inputs+"--------------------------");
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
 
    }
 
 
})