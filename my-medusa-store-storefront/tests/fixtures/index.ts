import { test as base } from '@playwright/test'
import { AuthenticationPage } from '../pages/AuthenticationPage'
import { HomePage } from '../pages/HomePage'
import { ProductListPage } from '../pages/ProductListPage'
import { ProductDetailPage } from '../pages/ProductDetailPage'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { ProfilePage } from '../pages/ProfilePage'

/**
 * Custom fixture type that extends Playwright's base test with all page objects.
 * Each fixture automatically instantiates the corresponding page object
 * and makes it available in tests without manual setup.
 */
type Pages = {
  authenticationPage: AuthenticationPage
  homePage: HomePage
  productListPage: ProductListPage
  productDetailPage: ProductDetailPage
  cartPage: CartPage
  checkoutPage: CheckoutPage
  profilePage: ProfilePage
}

/**
 * Extended test instance with all page object fixtures pre-wired.
 * Import `test` from this file instead of `@playwright/test` to get access
 * to all page objects directly in your test functions.
 *
 * @example
 * import { test, expect } from '../fixtures'
 * test('user can login', async ({ authenticationPage }) => { ... })
 */
export const test = base.extend<Pages>({
  authenticationPage: async ({ page }, use) => {
    await use(new AuthenticationPage(page))
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  productListPage: async ({ page }, use) => {
    await use(new ProductListPage(page))
  },
  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page))
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page))
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page))
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page))
  },
})

export { expect } from '@playwright/test'
