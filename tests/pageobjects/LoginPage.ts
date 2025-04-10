import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {


    private readonly userNameTxt: Locator
    private readonly PasswordTxt: Locator
    private readonly loginButton: Locator
    private readonly iconoCarro : Locator

    constructor(page: Page){
        this.userNameTxt = page.getByRole('textbox', {name:'Username'})
        this.PasswordTxt = page.getByRole('textbox', {name:'Password'})
        this.loginButton = page.getByRole('button', {name:'LOGIN'})
        this.iconoCarro = page.locator('//a[@class="shopping_cart_link fa-layers fa-fw"]//*[name()="svg"]')
    }

    async escribirUser (usuario: string){
        await this.userNameTxt.fill(usuario)
    }

    async escribirPassword (password: string){
        await this.PasswordTxt.fill(password)
    }

    async clicLogin (){
        await this.loginButton.click()
    }

    async loginCredenciales(usuario:string, password:string){
        await this.escribirUser(usuario)
        await this.escribirPassword(password)
        await this.clicLogin()
    }

    async LoginExitoso(){
        await expect(this.iconoCarro).toBeVisible()
    }


}