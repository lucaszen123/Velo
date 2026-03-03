import { test, expect } from '@playwright/test';

/// AAA - Arrange, Act, Assert
// AAA - preparar, agir, verificar

test('deve consultar um pedido aprovado', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-RFNVQX');
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  
  // Assert

  await expect(page.getByText('VLO-RFNVQX')).toBeVisible({ timeout: 15000 });
  await page.getByText('APROVADO').click();



 // await expect(page.getByTestId('order-result-id')).toBeVisible();
 // await expect(page.getByTestId('order-result-id')).toContainText('VLO-RFNVQX');

 //await expect(page.getByTestId('order-result-status')).toBeVisible();
 //await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');

});