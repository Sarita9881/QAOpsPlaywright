

const {LoginPage}=require('./LoginPage');
const {DashboardPage}=require('./DashboardPage');
const {CheckoutPage}=require('./CheckoutPage')
// this is the library which stores all the pages, okay?
class POManager{

    constructor(page)
    {
        this.page=page;
    this.loginPage=new LoginPage(this.page);
    this.dashboardPage=new DashboardPage(this.page);
    this.checkoutPage=new CheckoutPage(this.page);
    

    }

    getLoginPage()
    {
        return this.loginPage;
    }
     getDashboardPage()
    {
        return this.dashboardPage;
    }
     getCheckoutPage()
    {
        return this.checkoutPage;
    }
}
module.exports={POManager};