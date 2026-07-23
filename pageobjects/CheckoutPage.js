class CheckoutPage{

    constructor(page)
    {
        this.page=page
        this.productList=page.locator("div li")
        this.checkoutbutton=page.locator("text=Checkout")
    }

   waitForProductVisibility(productName) {
    return this.page.locator(`h3:has-text("${productName}")`);

}
    async navigateToCheckout()
 {
     await this.checkoutbutton.click();

 }
}

module.exports={CheckoutPage}