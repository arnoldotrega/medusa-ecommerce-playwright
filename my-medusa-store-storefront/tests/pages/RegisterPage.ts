import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class RegisterPage extends BasePage {
  readonly path = '/account/register'
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    super(page)
    this.firstNameInput = page.getByTestId('first-name-input')
    this.lastNameInput  = page.getByTestId('last-name-input')
    this.emailInput     = page.getByTestId('email-input')
    this.passwordInput  = page.getByTestId('password-input')
    this.submitButton   = page.getByTestId('register-button')
    this.errorMessage   = page.getByTestId('error-message')
  }

  async register(firstName: string, lastName: string, email: string, password: string) {
    await this.goto()
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }
}
