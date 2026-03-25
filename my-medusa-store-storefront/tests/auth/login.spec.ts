import { test, expect } from '../fixtures'
import { validUser, invalidUser } from '../utils/data/users'

test.describe('Login', () => {
  test.describe('Happy path', () => {
    test('should login with valid credentials @auth @smoke', async ({
      loginPage,
    }) => {
      await loginPage.login(validUser.email, validUser.password)
      await expect(loginPage.page).toHaveURL(/account/)
    })

    test('should show user menu after login @auth', async ({ loginPage }) => {
      await loginPage.login(validUser.email, validUser.password)
      await expect(loginPage.userMenu).toBeVisible()
    })

    test('should persist session after page refresh @auth', async ({
      loginPage,
    }) => {
      await loginPage.login(validUser.email, validUser.password)
      await loginPage.page.reload()
      await expect(loginPage.userMenu).toBeVisible()
    })

    test('should redirect to home after logout @auth', async ({
      loginPage,
    }) => {
      await loginPage.login(validUser.email, validUser.password)
      await loginPage.page.getByTestId('logout-button').click()
      await expect(loginPage.page).toHaveURL('/')
    })
  })

  test.describe('Validations', () => {
    test('should show error with wrong password @auth', async ({
      loginPage,
    }) => {
      await loginPage.login(invalidUser.email, invalidUser.password)
      await expect(loginPage.errorMessage).toBeVisible()
    })

    test('should show error with unregistered email @auth', async ({
      loginPage,
    }) => {
      await loginPage.login('notregistered@example.com', 'Pass123!')
      await expect(loginPage.errorMessage).toBeVisible()
    })

    test('should block empty form submission @auth', async ({ loginPage }) => {
      await loginPage.navigate('/account/login')
      await loginPage.submitButton.click()
      await expect(loginPage.emailError).toBeVisible()
    })

    test('should not login with SQL injection @auth', async ({ loginPage }) => {
      await loginPage.login("' OR 1=1 --", 'anything')
      await expect(loginPage.errorMessage).toBeVisible()
    })
  })
})
