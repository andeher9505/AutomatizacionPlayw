import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.ktronix.com/');
  await page.getByRole('textbox', { name: '¿Qué buscas hoy?' }).click();
  await page.getByRole('searchbox', { name: 'Submit' }).click();
  await page.getByRole('searchbox', { name: 'Submit' }).fill('xbox');
  await page.getByRole('combobox', { name: 'Submit' }).locator('i').first().click();
  await page.getByRole('listitem').filter({ hasText: 'Consolas XBOX Series S 1TB' }).getByRole('link').nth(2).click();
  await page.getByLabel('Agregar al carrito').click();
  await page.getByRole('link', { name: ' Mi carrito' }).click();
  await page.getByRole('button', { name: 'Ir a pagar' }).click();
  await page.getByRole('button', { name: 'Ir a pagar' }).click();
}); 