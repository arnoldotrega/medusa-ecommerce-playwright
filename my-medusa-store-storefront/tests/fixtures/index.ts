import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { HomePage } from '../pages/HomePage'
import { ProductListPage } from '../pages/ProductListPage'
import { ProductDetailPage } from '../pages/ProductDetailPage'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { ProfilePage } from '../pages/ProfilePage'

type Pages = {
  loginPage: LoginPage
  registerPage: RegisterPage
  homePage: HomePage
  productListPage: ProductListPage
  productDetailPage: ProductDetailPage
  cartPage: CartPage
  checkoutPage: CheckoutPage
  profilePage: ProfilePage
}

export const test = base.extend<Pages>({
  loginPage:         async ({ page }, use) => { await use(new LoginPage(page)) },
  registerPage:      async ({ page }, use) => { await use(new RegisterPage(page)) },
  homePage:          async ({ page }, use) => { await use(new HomePage(page)) },
  productListPage:   async ({ page }, use) => { await use(new ProductListPage(page)) },
  productDetailPage: async ({ page }, use) => { await use(new ProductDetailPage(page)) },
  cartPage:          async ({ page }, use) => { await use(new CartPage(page)) },
  checkoutPage:      async ({ page }, use) => { await use(new CheckoutPage(page)) },
  profilePage:       async ({ page }, use) => { await use(new ProfilePage(page)) },
})

export { expect } from '@playwright/test'
