class DashboardPage{

    constructor(page)
    {

        this.page=page;
       this.products = page.locator(".card-body");
       this.productsText=page.locator(".card-body b");
       this.cart=page.locator("[routerlink*='cart']");

    }

    async serachProductAddCart(productName)
    {
   
   //await this.page.locator(".card-body b").first().waitFor();
   //below locator will return all the element that is 8 with text (product name)
   const titles = await this.productsText.allTextContents();
   console.log(titles); 
   const count = await this.products.count();//looping through the titles we received & matching which we required to Add to card
   for (let i = 0; i < count; ++i) {
    /*/here matching the received nth index product name with we want to add to card once got adding it to cart.here is concept called chaing locater used 
    we conting find child by using b tage after products.nth(i) not writing complete part again just serching subpart after that*/
      if (await this.products.nth(i).locator("b").textContent() === productName) {
         //add to cart--below locaator add to cart button is found using text directly
         await this.products.nth(i).locator("text= Add To Cart").click();
         //breaking for loop once received expected product & added to cart.
         break;
      }
   }
}
 async navigateToCart()
 {
     await this.cart.click();
    await this.page.waitForLoadState('networkidle');

 }

    }
module.exports={DashboardPage}