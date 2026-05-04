import { test as base } from '@playwright/test'
import { createConfiguratorActions } from './actions/configuratorActions'
import { createOrderActions } from './actions/orderActions'
import { createOrderLookupActions } from './actions/orderLookupActions'



type App = {
   configurator: ReturnType<typeof createConfiguratorActions>
   order: ReturnType<typeof createOrderActions>
   orderLookup: ReturnType<typeof createOrderLookupActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
        configurator: createConfiguratorActions(page),
        order: createOrderActions(page),
        orderLookup: createOrderLookupActions(page),
    }
    await use(app)
  },
})

export { expect } from '@playwright/test'
