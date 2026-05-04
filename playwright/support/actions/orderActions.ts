import { expect, Page } from '@playwright/test'

export function createOrderActions(page: Page) {
  return {
    async expectRedirectedToOrder() {
      await expect(page).toHaveURL('/order')
      await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
    },

    async expectPaymentOption(label: string | RegExp) {
      await expect(page.getByRole('button', { name: label })).toBeVisible()
    },
  }
}
