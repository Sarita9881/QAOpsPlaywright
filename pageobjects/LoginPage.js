class LoginPage{

    constructor(page)
    {
        //the scope of constructor page variable was limited to constructor so to make it available publicaly 
        // we assigned this to new page variable
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

   async goto()
    {
        await this.page.goto("https://rahulshettyacademy.com/client")
    }

    async validLogin(username,password)
    {
         await this.userName.fill(username);
         await this.password.fill(password);
         await this.signInButton.click();
         await this.page.waitForLoadState('networkidle');

    }
}
module.exports={LoginPage};