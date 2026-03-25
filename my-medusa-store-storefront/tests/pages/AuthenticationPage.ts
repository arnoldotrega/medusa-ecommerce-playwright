import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * LoginPage represents the account login page (/account/login).
 * Provides locators and actions for authenticating a user.
 */
export class AuthenticationPage extends BasePage {
//Login page elements
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly loginErrorMessage: Locator
  readonly userMenu: Locator
  readonly registerLink: Locator 

// Elements exclusive for the Join form
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly phoneInput: Locator
  readonly registerButton: Locator
 


  /**
   * @param page - The Playwright Page instance injected from the test
   */
  constructor(page: Page) {
    super(page)
    this.emailInput = page.getByTestId('email-input')
    this.passwordInput = page.getByTestId('password-input')
    this.submitButton = page.getByTestId('sign-in-button')
    this.loginErrorMessage = page.getByTestId('login-error-message')
    this.userMenu = page.getByTestId('user-menu')
    this.registerLink = page.getByTestId('register-link')
     this.registerButton = page.getByTestId('register-button')
    this.firstNameInput = page.getByTestId('first-name-input')
    this.lastNameInput = page.getByTestId('last-name-input')
    this.phoneInput = page.getByTestId('phone-input')
    
  }

  /**
   * Navigates to the login page and submits the login form
   * @param email - The user's email address
   * @param password - The user's password
   */
  async login(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }

  async createAccount(firstName: string, lastName: string, email: string, password: string, phone?: string) {
    await this.registerLink.click()
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    if (phone) await this.phoneInput.fill(phone)
    await this.registerButton.click()
  }
}
