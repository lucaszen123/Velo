import { expect, Page } from '@playwright/test'

export function createConfiguratorActions(page: Page) {
  return {
      async open() {
      await page.goto('/configure')
    },

    async selectColor(colorName: string) {
     await page.getByRole('button', { name: colorName }).click()
    },

    async selectWheels(wheelsName: string | RegExp) {
      await page.getByRole('button', { name: wheelsName }).click()
    },

    async toggleOptional(name: string | RegExp) {
      await page.getByRole('checkbox', { name }).click()
    },

    async clickCheckout() {
      await page.getByRole('button', { name: 'Monte o Seu' }).click()
    },

    async expectTotalPrice(value: string) {
      const priceElement = page.getByTestId('total-price')
      await expect(priceElement).toBeVisible()
      await expect(priceElement).toHaveText(value)
    },

    async expectVehicleImage(src: string) {
      const vehicleImage = page.locator('img[alt^="Velô Sprint"]')
      await expect(vehicleImage).toHaveAttribute('src', src)
    },
  }
}
