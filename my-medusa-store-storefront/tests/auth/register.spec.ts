import { test, expect } from '../fixtures'
import { newUser, validUser } from '../utils/data/users'

test.describe('Register', () => {
  test.describe('Happy path', () => {
    test('should register a new user successfully @auth', async ({
      registerPage,
    }) => {
      await registerPage.register(
        newUser.firstName,
        newUser.lastName,
        newUser.email,
        newUser.password,
      )
      await expect(registerPage.page).toHaveURL(/account/)
    })
  })

  test.describe('Validations', () => {
    test('should show error for already registered email @auth', async ({
      registerPage,
    }) => {
      await registerPage.register(
        validUser.firstName,
        validUser.lastName,
        validUser.email,
        validUser.password,
      )
      await expect(registerPage.errorMessage).toBeVisible()
    })

    test('should show error for invalid email format @auth', async ({
      registerPage,
    }) => {
      await registerPage.register('Test', 'User', 'invalidemail', 'Pass123!')
      await expect(registerPage.errorMessage).toBeVisible()
    })

    test('should show error when fields are empty @auth', async ({
      registerPage,
    }) => {
      await registerPage.navigate('/account/register')
      await registerPage.submitButton.click()
      await expect(registerPage.errorMessage).toBeVisible()
    })
  })
})
