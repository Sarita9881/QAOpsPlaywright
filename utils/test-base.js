const base=require('@playwright/test');


//browser,page are default fixtures provied by playwright here we are creating a custom fixture below.

exports.customtest=base.test.extend(
{

testDataForOrder:{
    username: "anshika@gmail.com",
    password: "Iamking@000",
    productName: "ZARA COAT 3"
                }
})