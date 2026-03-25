import { test, expect } from '../fixtures'
import { validUser } from '../utils/data/users'

test.describe('Smoke Tests', () => {
  test('homepage loads correctly @smoke', async ({ homePage }) => {
    await homePage.navigate('/')
    await expect(homePage.page).toHaveTitle(/.*/)
  })

  test('product list page loads @smoke', async ({ productListPage }) => {
    await productListPage.navigate('/store')
    await expect(productListPage.productCards.first()).toBeVisible()
  })

  test('login page loads @smoke', async ({ loginPage }) => {
    await loginPage.navigate('/account/login')
    await expect(loginPage.emailInput).toBeVisible()
    await expect(loginPage.passwordInput).toBeVisible()
  })

  test('cart page loads @smoke', async ({ cartPage }) => {
    await cartPage.navigate('/cart')
    await expect(cartPage.page).toHaveURL(/cart/)
  })

  test('register page loads @smoke', async ({ registerPage }) => {
    await registerPage.navigate('/account/register')
    await expect(registerPage.emailInput).toBeVisible()
  })
})
