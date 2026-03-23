import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  readonly path = '/account/login'
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator
  readonly userMenu: Locator
  readonly emailError: Locator
  readonly passwordError: Locator

  constructor(page: Page) {
    super(page)
    this.emailInput    = page.getByTestId('email-input')
    this.passwordInput = page.getByTestId('password-input')
    this.submitButton  = page.getByTestId('sign-in-button')
    this.errorMessage  = page.getByTestId('error-message')
    this.userMenu      = page.getByTestId('user-menu')
    this.emailError    = page.getByTestId('email-error')
    this.passwordError = page.getByTestId('password-error')
  }

  async login(email: string, password: string) {
    await this.goto()
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }
}
