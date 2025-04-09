import { test, expect } from '@playwright/test';


test('compras' , async({page}) => {

    await page.goto('https://www.saucedemo.com/v1/');
    
    await page.getByRole('textbox', {name:'Username'}).fill('standard_user')
    await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce')
    await page.getByRole('button', {name:'LOGIN'}).click()
    //await page.locator('//input[@id="login-button"]').click();


    

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all();
    const randomIndex = Math.floor(Math.random()* itemsContainer.length);
    const randomItem = itemsContainer[randomIndex]

    const expectDescription = await randomItem.locator('.inventory_item_desc').innerText();
    const expectName = await randomItem.locator('.inventory_item_name').innerText();
    const expectPrice = await randomItem.locator('.inventory_item_price').innerText();

    console.log(`Price: ${expectPrice} Name: ${expectName} Description: ${expectDescription}`)

    await randomItem.getByRole('button', {name:'ADD TO CART'}).click()

    await page.locator('a.shopping_cart_link').click()



    expect(page.getByRole('link',{name :'CHECKOUT'})).toBeVisible()
    const actualName = await page.locator('.inventory_item_name').innerText()
    const actualDescription = await page.locator('.inventory_item_desc').innerText()
    const actualPrice = await page.locator('.inventory_item_price').innerText()

    expect(actualName).toEqual(expectName)
    expect(actualDescription).toEqual(expectDescription)
    expect(actualPrice.replace('$', '')).toEqual(expectPrice.replace('$', ''));


    await page.getByRole('link', {name:'CHECKOUT'}).click()
    await page.getByRole('textbox', {name:'First Name'}).fill('Andres Felipe')
    await page.getByRole('textbox', {name:'Last Name'}).fill('Herrera')
    await page.getByRole('textbox', {name:'Zip/Postal Code'}).fill('Zona 5 calle 34')
    await page.getByRole('button', {name:'CONTINUE'}).click()

    const numeroOrden = await page.locator('//*[@id="checkout_summary_container"]/div/div[2]/div[2]').innerText();
    console.log('Numero de orden es: ', numeroOrden)
    await page.getByRole('link', {name:'FINISH'}).click()
    expect(page.getByRole('heading', {name: 'THANK YOU FOR YOUR ORDER'})).toBeVisible

    //await page.pause();


});
