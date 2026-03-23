import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class ProfilePage extends BasePage {
  readonly path = '/account/profile'
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly emailDisplay: Locator
  readonly saveButton: Locator
  readonly orderHistory: Locator
  readonly successMessage: Locator

  constructor(page: Page) {
    super(page)
    this.firstNameInput = page.getByTestId('first-name-input')
    this.lastNameInput  = page.getByTestId('last-name-input')
    this.emailDisplay   = page.getByTestId('profile-email')
    this.saveButton     = page.getByTestId('save-button')
    this.orderHistory   = page.getByTestId('order-history-item')
    this.successMessage = page.getByTestId('success-message')
  }

  async updateName(firstName: string, lastName: string) {
    await this.goto()
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.saveButton.click()
  }
}
